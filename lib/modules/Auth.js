/*
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

'use strict'

var UsergridAuth = function(token, expiry) {
    var self = this

    self.token = token
    self.expiry = expiry || 0

    var usingToken = (token) ? true : false

    Object.defineProperty(self, "hasToken", {
        get: function() {
            return (self.token) ? true : false
        },
        configurable: true
    })

    Object.defineProperty(self, "isExpired", {
        get: function() {
            return (usingToken) ? false : (Date.now() >= self.expiry)
        },
        configurable: true
    })

    Object.defineProperty(self, "isValid", {
        get: function() {
            return (!self.isExpired && self.hasToken)
        },
        configurable: true
    })

    Object.defineProperty(self, 'tokenTtl', {
        configurable: true,
        writable: true
    })

    _.assign(self, {
        destroy: function() {
            self.token = undefined
            self.expiry = 0
            self.tokenTtl = undefined
        }
    })

    return self
}

var UsergridAppAuth = function() {
    var self = this
    var args = flattenArgs(arguments)
    if (_.isPlainObject(args[0])) {
        self.clientId = args[0].clientId
        self.clientSecret = args[0].clientSecret
        self.tokenTtl = args[0].tokenTtl
    } else {
        self.clientId = args[0]
        self.clientSecret = args[1]
        self.tokenTtl = args[2]
    }
    UsergridAuth.call(self)
    _.assign(self, UsergridAuth)
    return self
}
inherits(UsergridAppAuth,UsergridAuth)

var UsergridUserAuth = function() {
    var self = this
    var args = flattenArgs(arguments)
    if (_.isPlainObject(args[0])) {
        self.username = args[0].username
        self.email = args[0].email
        self.tokenTtl = args[0].tokenTtl
    } else {
        self.username = args[0]
        self.email = args[1]
        self.tokenTtl = args[2]
    }
    UsergridAuth.call(self)
    _.assign(self, UsergridAuth)
    return self
}
inherits(UsergridUserAuth,UsergridAuth)