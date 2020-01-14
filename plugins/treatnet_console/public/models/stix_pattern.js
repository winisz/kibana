export class StixPattern {
  /* example object
  collection: "tm_collection"
  created: "2019-12-03T13:27:12+01:00"
  description: ""
  id: 1
  import_date: "2019-12-03T13:27:39.861498+01:00"
  is_deleted: false
  labels: []
  last_modification_date: "2019-12-03T13:27:14+01:00"
  modification_date: "2019-12-03T13:27:39.861527+01:00"
  name: "StopPhishing"
  pattern: "[(domain-name:value = 'check-net.ru') AND (http-request-ext:request_value = '/') AND (network-traffic:dst_port = 80) AND (network-traffic:protocols IN [tcp,http])]"
  pattern_id: "comp_internal_phishing_http://check-net.ru/_413"
  source_ref: ""
  target_ref: ""
  type: "domain-name"
  valid_from: "2019-12-03T13:27:15+01:00"
  valid_until: "2020-12-31T23:59:59+01:00"
  */

  constructor (data) {
    this.id = data.id;
    this.name = data.name;
    this.pattern_id = data.pattern_id;
    this.pattern = data.pattern;

    this.description = data.description;
    this.collection = data.collection;
    this.labels = data.labels;

    this.type = data.type;
    this.source_ref = data.source_ref;
    this.target_ref = data.target_ref;
    this.is_deleted = data.is_deleted;

    this.created = data.created;
    this.import_date = data.import_date;
    this.modification_date = data.modification_date;
    this.last_modification_date = data.last_modification_date;

    this.valid_from = data.valid_from;
    this.valid_until = data.valid_until;
  }
}
