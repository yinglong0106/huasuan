<template>
    <div id="map_container"></div>
</template>
<style scoped>
    #map_container{
        position:absolute;
        opacity:0;
    }
</style>
<script type="text/javascript">
    export default {
        name: 'Map',
        data () {
            return {
                
            }
        },
         mounted(){
          console.log(navigator)
          var that = this
          //h5定位当前位置
        //    navigator.geolocation.getCurrentPosition(function(position){
        //        console.log(position)
        //     }, function(error){
        //         console.log("Error code: " + error.code);
        //         console.log("Error message: " + error.message);
        //     });
        var map = new BMap.Map("map_container");   
        var point =  new BMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 11);      
            // 创建地理编码实例      
            var myGeo = new BMap.Geocoder();      
            // 根据坐标得到地址描述    
            myGeo.getLocation(point, function(result){      
                if (result){      
                    console.log(result)
                    that.$store.commit('getLocal',{
                        lng:result.point.lng,
                        lat:result.point.lng,
                        address:result.address
                    })
                }else{
                    console.log("获取地址失败")
                }
            });
            console.log("容器中的地址")
            console.log(this.$store)
        },
    }
</script>

