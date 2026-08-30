# TableHost legacy staging on DS9

This deployment is intentionally separate from the modern `table_host` Next.js
application. The legacy Rails/CRA app uses:

- checkout: `/home/deploy/Projects/table_host_old_original`
- branch: `dev`
- public base path: `/firstproject`
- Rails API listener: `127.0.0.1:6436`
- service: `table-host-legacy-staging.service`
- database: `table_host_development`

Install the tracked wrapper, service, Nginx snippet, and updater with root-owned
permissions. Add this include inside the DS9 port 80 server block, before its
catch-all `location /` block:

```nginx
include /etc/nginx/snippets/firstproject-staging.conf;
```

Routine staging releases run through:

```bash
sudo /usr/local/sbin/table-host-legacy-staging-updater
```
