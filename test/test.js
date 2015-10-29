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

    let chai = require('chai');

    let expect = chai.expect;

    if (!process.env.giantBombApiKey) {
        console.error('The environment variable "giantBombApiKey" must be set to run the tests!');
        process.exit(1);
    }

    let GiantBombAPI = require('../index');

    let GBAPI = new GiantBombAPI(process.env.giantBombApiKey);

    describe('GiantBombAPI', function () {
        this.timeout(10000);

        describe('#searchGames()', function () {
            it('should return an array of objects when searching without namesOnly option', function () {
                return GBAPI.searchGames('Counter Strike').then(function (games) {
                    expect(games).to.be.a('array');
                    expect(games[0]).to.be.a('object');
                });
            });

            it('should return an array of strings when searching with namesOnly option', function () {
                return GBAPI.searchGames('Counter Strike', {namesOnly: true}).then(function (games) {
                    expect(games).to.be.a('array');
                    expect(games[0]).to.be.a('string');
                });
            });

            it('should return an array of length 10 when limit of 10 provided', function () {
                return GBAPI.searchGames('Counter Strike', {limit: 10}).then(function (games) {
                    expect(games).to.be.a('array');
                    expect(games.length).to.equal(10);
                });
            });
        });
    });
})();