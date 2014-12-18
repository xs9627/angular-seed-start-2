angular.module('managementCenter.iisController',['managementCenter.iisServers'])
.controller('AppPoolCtrl', 
            ['$scope', '$modal', 'iisServerList', function($scope, $modal, iisServerList){
                $scope.serverHoldPlace = "Select Server";
                $scope.serverList = iisServerList;
                $scope.open = function(type){
                    var items;
                    if(type=='Add'){
                        items = [{server:'08', poolName:''}];
                    }else if(type=='Edit'){
                        items = [{server:'08', poolName:'Default'}];
                    }
                    $modal.open({
                        templateUrl:'applicationPoolEdit.html',
                        controller:'AppPoolEditCtrl',
                        resolve:{
                            items: function(){
                                return items;
                            },
                            serverList: function(){
                                return iisServerList;
                            }
                        }
                    });
                };
                
                
            }])
.controller('AppPoolEditCtrl',
           ['$scope', '$modalInstance', 'items', 'serverList', function($scope, $modalInstance, items, serverList){
               $scope.serverList = serverList;
               $scope.items = items;
               $scope.selected = {
                   item: null
               };
               
               $scope.formData = {};
               $scope.ok = function(){
                   var selectedSevers = $scope.formData.serverName
                   for(var serverName in selectedSevers) {
                       if($scope.formData.serverName.hasOwnProperty(serverName) && selectedSevers[serverName]){
                           serverList.forEach(function(server){
                              if(server.name == serverName){
                                  var pool = new server.pool({
                                      AutoStart: $scope.formData.autoStart,
                                      Name: $scope.formData.name,
                                      IdentityType: $scope.formData.identity,
                                      RuntimeVersion: $scope.formData.frameworkVersion,
                                      UserName: $scope.formData.userName,
                                      Password: $scope.formData.password,
                                      PipelineMode: $scope.formData.pipeMode
                                  });
                
                                  pool.$add();
                                  var a = 1;
                              } 
                           });
                       }
                   }
                   //alert($scope.formData.name);
                   //$modalInstance.close();
               };
               
               $scope.cancel = function(){
                   $modalInstance.dismiss('cancel');
                  
               };
           }])