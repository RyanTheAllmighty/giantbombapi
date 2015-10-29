/*
 * giantbombapi - https://github.com/RyanTheAllmighty/giantbombapi
 * Copyright (C) 2015 RyanTheAllmighty
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
    'use strict';

    let _ = require('lodash');
    let request = require('request');

    let objectSymbol = Symbol();

    let baseURL = "http://www.giantbomb.com/api/";

    module.exports = class GiantBombAPI {
        constructor(apiKey) {
            this[objectSymbol] = {
                apiKey
            }
        }

        get apiKey() {
            return this[objectSymbol].apiKey;
        }

        buildURL(path, params) {
            let url = baseURL;

            url += path;

            url += '?api_key=' + this.apiKey;
            url += '&format=json';

            _.forEach(params, function (value, key) {
                url += '&' + key + '=' + encodeURIComponent(value);
            });

            return url;
        }

        searchGames(name, opts) {
            let self = this;

            let options = {
                namesOnly: false,
                limit: 100
            };

            if (opts) {
                _.merge(options, opts);
            }

            return new Promise(function (resolve, reject) {
                request.get({url: self.buildURL('search', {resources: 'game', query: name, limit: options.limit}), json: true}, function (err, res, body) {
                    if (err) {
                        return reject(err);
                    }

                    if (body.status_code !== 1) {
                        return reject(new Error(body.error));
                    }

                    if (!body.results) {
                        return reject(new Error('No results in response body!'));
                    }

                    if (options.namesOnly) {
                        resolve(_.map(body.results, 'name'));
                    } else {
                        resolve(body.results);
                    }
                });
            });
        }
    };
})();