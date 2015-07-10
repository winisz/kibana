'use strict';

let Promise = require('bluebird');
let Joi = require('joi');
let _ = require('lodash');
let override = require('./override');

module.exports = class Config {
  constructor(schema, defaults) {
    this.schema = schema || Joi.object({}).default();
    this.config = {};
    this.set(defaults);
  }

  extendSchema(key, schema) {
    let additionalSchema = {};
    if (!this.has(key)) {
      additionalSchema[key] = schema;
      this.schema = this.schema.keys(additionalSchema);
      this.reset(this.config);
    } else {
      throw new Error(`Config schema already has key ${key}`);
    }
  }

  reset(obj) {
    this._commit(obj);
  }

  set(key, value) {
    // clone and modify the config
    let config = _.cloneDeep(this.config);
    if (_.isPlainObject(key)) {
      config = override(config, key);
    } else {
      _.set(config, key, value);
    }

    // attempt to validate the config value
    this._commit(config);
  }

  _commit(newConfig) {
    // resolve the current environment
    let env = newConfig.env;
    delete newConfig.env;
    if (_.isObject(env)) env = env.name;
    if (!env) env = process.env.NODE_ENV || 'production';

    // pass the environment as context so that it can be refed in config
    let context = {
      env: env,
      prod: env === 'production',
      dev: env === 'development',
    };

    if (!context.dev && !context.prod) {
      throw new TypeError(`Unexpected environment "${env}", expected one of "development" or "production"`);
    }

    let results = Joi.validate(newConfig, this.schema, {
      context: context
    });

    if (results.error) {
      throw results.error;
    }

    this.config = results.value;
  }

  get(key) {
    if (!key) {
      return _.cloneDeep(this.config);
    }

    let value = _.get(this.config, key);
    if (value === undefined) {
      if (!this.has(key)) {
        throw new Error('Unknown config key: ' + key);
      }
    }
    return _.cloneDeep(value);
  }

  has(key) {
    function has(key, schema, path) {
      path = path || [];
      // Catch the partial paths
      if (path.join('.') === key) return true;
      // Only go deep on inner objects with children
      if (schema._inner.children.length) {
        for (let i = 0; i < schema._inner.children.length; i++) {
          let child = schema._inner.children[i];
          // If the child is an object recurse through it's children and return
          // true if there's a match
          if (child.schema._type === 'object') {
            if (has(key, child.schema, path.concat([child.key]))) return true;
          // if the child matches, return true
          } else if (path.concat([child.key]).join('.') === key) {
            return true;
          }
        }
      }
    }

    if (_.isArray(key)) {
      // TODO: add .has() support for array keys
      key = key.join('.');
    }

    return !!has(key, this.schema);
  }
};
