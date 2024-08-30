﻿



// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/athletes');
    //self.baseUri = ko.observable('http://localhost:62595/api/athletes');
    self.displayName = 'Olympic Athletes List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.favourites = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };
    self.toggleFavourite = function (id) {
        if (self.favourites.indexOf(id) == -1) {
            self.favourites.push(id);
        }
        else {
            self.favourites.remove(id);
        }
        localStorage.setItem("fav", JSON.stringify(self.favourites()));
    };
    self.SetFavourites = function () {
        let storage;
        try {
            storage = JSON.parse(localStorage.getItem("fav"));
        }
        catch (e) {
            ;
        }
        if (Array.isArray(storage)) {
            self.favourites(storage);
        }
    }
    $().ready(function () {
        $("#tags").autocomplete({
            minLength: 3,
            source: function (request, response) {
                $.ajax({
                    url: "http://192.168.160.58/Olympics/api/Athletes//SearchByName?q=" + request.term,
                    dataType: "json"
                }).done(function (APIdata) {
                    data = APIdata;
                    let athletes = data.map(function (athlete) {
                        return {
                            label: athlete.Name,
                            value: athlete.Id
                        }
                    });
                    response(athletes.slice(0, 10));
                });
            },
            select: function (event, ui) {
                window.location.href = "athleteDetails.html?id=" + ui.item.value;
            },
        }).find("li").css({ width: "150px" });

    });


    self.formatNameSex = function (sex) {
        const iconName = sex == "M" ? "mars" : "venus";
        const icon = `<i class="fa fa-${iconName}" aria-hidden="true"></i>`

        return icon + " " + name;
    }

    self.formatPosition = function (med) {
        if (med == "1")
            return 'First Place (Gold)<br /><img style="width:40px" src="medalGold.png" />';
        if (med == "2")
            return 'Second Place (Silver)<br /><img style="width:40px" src="medalSilver.png" />';
        if (med == "3")
            return 'Third Place (Bronze)<br /><img style="width:40px" src="medalBronze.png" />';
        if (med == "4")
            return "(No Medal)";
    };


    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getAthletes...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            self.SetFavourites();
        });
    };

    
    self.activate2 = function (id, sortby='name') {
        console.log('CALL: getGames...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize() + "&sortby=" + sortby;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            //self.SetFavourites();
            for (var i = 0; i <= self.records().length; i++){
                self.updateheart((self.records()[i]).Id, 'athletes')
            }
        });
    };

    //--- Internal functions

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    
var pg = getUrlParameter('page');
self.sortby = ko.observable(getUrlParameter('sortby'))
console.log(pg);
if (pg == undefined){
    if (self.sortby()!=undefined){
        self.activate2(1, self.sortby());
        $("#divshow").removeClass("d-none")
    }
    else  {self.activate(1);}
}
else {
    if (self.sortby()!=undefined){
        self.activate2(pg, self.sortby())
        $("#divshow").removeClass("d-none")
    }
    else {self.activate(pg);}
}
$("#remover").click(function(){
    $("#divshow").addClass("d-none")
})

    console.log("VM initialized!");

};

ko.bindingHandlers.safeSrc = {
    update: function (element, valueAccessor) {
        var options = valueAccessor();
        var src = ko.unwrap(options.src);
        if (src == null) {
            $(element).attr('src', ko.unwrap(options.fallback));
        }
        $('<img />').attr('src', src).on('load', function () {
            $(element).attr('src', src);
        }).on('error', function () {
            $(element).attr('src', ko.unwrap(options.fallback));
        });

    }
};
$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})