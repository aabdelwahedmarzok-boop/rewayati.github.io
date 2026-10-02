const C="rewayati-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","icon-192.png"])).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET")return;const u=new URL(r.url);
const lib=/gstatic\.com\/firebasejs|cdnjs\.cloudflare\.com/.test(r.url);
const put=x=>{if(x&&x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x};
if(lib)e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)));
else if(u.origin==location.origin)e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
