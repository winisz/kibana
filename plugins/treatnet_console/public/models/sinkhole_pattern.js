export class SinkholePattern {
  /* example object
  "id": 1,
  "pattern_type": "ipv4",
  "address": "2.2.2.2",
  "entry_type": "EXACT",
  "port": null,
  "method": null,
  "version": null,
  "path": null,
  "path_is_regexp": false,
  "transport_protocol": null,
  "request_protocol": null,
  "random_id": "0af7489b-5259-491a-9e24-7bc851fb1479",
  "pattern": 2
  */

  constructor (data) {
    this.id = data.id;
    this.pattern_type = data.pattern_type;
    this.random_id = data.random_id;

    this.entry_type = data.entry_type;
    this.port = data.port;
    this.method = data.method;
    this.version = data.version;
    this.path = data.path;
    this.path_is_regexp = data.path_is_regexp;
    this.transport_protocol = data.transport_protocol;
    this.request_protocol = data.request_protocol;
  }
}
