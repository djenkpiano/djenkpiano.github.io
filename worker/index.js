/**
 * First-party relay for Umami analytics.
 *
 * Ad blockers recognise cloud.umami.is / gateway.umami.is and block them, so
 * visitors using one never show up in the stats. This Worker serves Umami's
 * script and forwards its data from a neutral address instead:
 *
 *   GET  /p.js  -> https://cloud.umami.is/script.js   (endpoint rewritten to /e)
 *   POST /e     -> https://gateway.umami.is/api/send  (visitor IP attached)
 *
 * The visitor's IP has to be passed on explicitly: Umami would otherwise see
 * the Worker's own IP for everyone, putting every visitor in a Cloudflare
 * datacenter and merging them into one session. The Worker logs nothing.
 */

const UMAMI_SCRIPT = 'https://cloud.umami.is/script.js'
const UMAMI_SEND = 'https://gateway.umami.is/api/send'
const WEBSITE_ID = 'd3038a45-5cbe-4587-8b15-2635387dc44f'
const ALLOWED_ORIGINS = ['https://djenkpiano.me', 'https://www.djenkpiano.me']

const SCRIPT_PATH = '/p.js'
const SEND_PATH = '/e'
const MAX_BODY = 16 * 1024

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url)

    if (pathname === SCRIPT_PATH && request.method === 'GET') return serveScript()

    // /api/send too, in case Umami ever changes its script and the rewrite misses
    if (pathname === SEND_PATH || pathname === '/api/send') {
      if (request.method === 'OPTIONS') return withCors(new Response(null, { status: 204 }), request)
      if (request.method === 'POST') return withCors(await forward(request), request)
    }

    return new Response('Not found', { status: 404 })
  },
}

async function serveScript() {
  const upstream = await fetch(UMAMI_SCRIPT, { cf: { cacheTtl: 3600, cacheEverything: true } })
  if (!upstream.ok) return new Response('', { status: 502 })

  // The script posts to `${host}/api/send`. Point it at our neutral path so the
  // URL doesn't match generic blocklist rules.
  const code = (await upstream.text()).replaceAll('/api/send', SEND_PATH)

  return new Response(code, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

async function forward(request) {
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) {
    return new Response('Too large', { status: 413 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  // Only relay for this site, so the Worker can't be used as anyone's free relay.
  if (body?.payload?.website !== WEBSITE_ID) return new Response('Forbidden', { status: 403 })

  const ip = request.headers.get('CF-Connecting-IP')
  if (ip) body.payload.ip = ip

  const headers = new Headers({ 'Content-Type': 'application/json' })
  for (const name of ['User-Agent', 'Accept-Language', 'x-umami-website-id', 'x-umami-hostname', 'x-umami-cache']) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  // Second route for the IP, for proxies that read it from headers instead.
  if (ip) {
    headers.set('X-Forwarded-For', ip)
    headers.set('X-Real-IP', ip)
  }

  const upstream = await fetch(UMAMI_SEND, { method: 'POST', headers, body: JSON.stringify(body) })
  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' },
  })
}

function withCors(response, request) {
  const origin = request.headers.get('Origin')
  const res = new Response(response.body, response)
  res.headers.set('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0])
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-umami-website-id, x-umami-hostname, x-umami-cache')
  res.headers.set('Access-Control-Max-Age', '86400')
  res.headers.set('Vary', 'Origin')
  return res
}
