var Counter1 = [];
var Name1 = [];

        $.ajax({
        type: 'GET',
        url: 'http://192.168.160.58/Olympics/api/statistics/Games_Athletes',
        headers: {
        'Content-Type': 'application/json'
        },
        success: function (data, status, xhr) {

            var athData = data;

            athData.forEach(element => {
            Counter1.push(element.Counter);
            Name1.push(element.Name);
            });

            createBarGraph(Counter1, Name1);

            }
        });

        function createBarGraph(Counter, Name) {
        let barChartz = new Chart("atletas", {
            type: "bar",
            data: {
                labels: Name1,
                datasets: [{
                data: Counter1,
                label: 'Number of Athletes per Olympic Games edition',
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)',],
                borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)',],
                borderWidth: 1
            }]
            },
            options:{
                animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
                },
        }
        });
        }


        var Counter2 = [];
        var Name2 = [];


        $.ajax({
            type: 'GET',
            url: 'http://192.168.160.58/Olympics/api/statistics/Games_Competitions',
            headers: {
            'Content-Type': 'application/json'
            },
            success: function (data, status, xhr) {
    
                var compData = data;
    
                compData.forEach(element => {
                Counter2.push(element.Counter);
                Name2.push(element.Name);
                });
    
                createBarGraphi(Counter2, Name2);
    
                }
            });
    
            function createBarGraphi(Counter, Name) {
            let barChart = new Chart("comps", {
                type: "bar",
                data: {
                    labels: Name2,
                    datasets: [{
                    data: Counter2,
                    label: 'Number of Competitions per Olympic Games edition',
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)',],
                    borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)',],
                    borderWidth: 1
                }] 
                },
                options:{
                    animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                    },
            }
            });
            }


    
            var Counter3 = [];
            var Name3 = [];
    
    
            $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/Olympics/api/statistics/Games_Countries',
                headers: {
                'Content-Type': 'application/json'
                },
                success: function (data, status, xhr) {
        
                    var compData = data;
        
                    compData.forEach(element => {
                    Counter3.push(element.Counter);
                    Name3.push(element.Name);
                    });
        
                    createBarGraphii(Counter3, Name3);
        
                    }
                });
        
                function createBarGraphii(Counter, Name) {
                let barCharts = new Chart("countries", {
                    type: "bar",
                    data: {
                        labels: Name3,
                        datasets: [{
                        data: Counter3,
                        label: 'Number of Countries per Olympic Games edition',
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)',],
                        borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)',],
                        borderWidth: 1
                    }] 
                    },
                    options:{
                        animations: {
                        tension: {
                            duration: 1000,
                            easing: 'linear',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                        },
                }
                });
                }
    
                var Counter4 = [];
                var Name4 = [];
        
        
                $.ajax({
                    type: 'GET',
                    url: 'http://192.168.160.58/Olympics/api/statistics/Games_Modalities',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    success: function (data, status, xhr) {
            
                        var compData = data;
            
                        compData.forEach(element => {
                        Counter4.push(element.Counter);
                        Name4.push(element.Name);
                        });
            
                        createBarGraphiii(Counter4, Name4);
            
                        }
                    });
            
                    function createBarGraphiii(Counter, Name) {
                    let kakaka = new Chart("modalities", {
                        type: "bar",
                        data: {
                            labels: Name4,
                            datasets: [{
                            data: Counter4,
                            label: 'Number of Modalities per Olympic Games edition',
                            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)',],
                            borderColor: ['rgb(75, 192, 192)', 'rgb(54, 162, 235)',],
                            borderWidth: 1
                        }] 
                        },
                        options:{
                            animations: {
                            tension: {
                                duration: 1000,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: true
                            }
                            },
                    }
                    });
                    }
        