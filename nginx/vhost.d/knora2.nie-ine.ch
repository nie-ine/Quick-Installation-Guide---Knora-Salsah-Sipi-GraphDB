server_tokens off;
client_max_body_size 3m;        # set maximum allowed uploadable body size

# set timeouts
# usually to prevent a timeout when
# graphdb/knora has to handle a big job
# (e.g. during data upload or challenging query)
proxy_connect_timeout 4500s;
proxy_send_timeout 4500;
proxy_read_timeout 4500;
