angular.module('managementCenter.iisServers', ['ngResource', 'managementCenter.config'])
.factory('iisServerList', ['$resource', 'servicesConfig',
    function ($resource, servicesConfig) {
        var services = [];
        servicesConfig.forEach(function (service) {
            services.push({
                name: service.name,
                pool: $resource(service.url + '/pool:poolId', {poolId:'@id'}, {
                    'add': {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                })
            });
        });
        return services;
}]);