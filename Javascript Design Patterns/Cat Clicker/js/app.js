$(function() {
    /*=======Model=======*/
    var model = {
        currentCat: null,
        cats: [{
            clickCount: 0,
            name: "My new Photo",
            src: "./img/one.jpg"
        }, {
            clickCount: 0,
            name: "My latest photo",
            src: "./img/two.jpg"
        }]
    };
    /*========Octopus========*/
    var octopus = {
        init: function() {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
            catAdminView.init();
        },
        getCats: function() {
            return model.cats;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },
        incrementCounter: function() {
            model.currentCat.clickCount += 1;
            catView.render();
        },
        setEnteredCatDetails: function(catAdminDetails) {
            /*model.currentCat.name = catAdminDetails.name;
            model.currentCat.src = catAdminDetails.src;
            model.currentCat.clickCount = catAdminDetails.clickCount;*/
            model.currentCat = Object.assign(model.currentCat, catAdminDetails);
            catListView.render();
            catView.render();

        }
    };

    /*=======View for CatList=============*/
    var catListView = {
        init: function() {
            this.catListElem = document.getElementById("catList");
            this.render();
        },
        render: function() {
            var cats = octopus.getCats();
            this.catListElem.innerHTML = "";
            for (var i = 0; i < cats.length; i++) {
                var elem = document.createElement("li");
                var cat = cats[i];
                elem.textContent = cat.name;
                elem.addEventListener("click", function(cat) {
                    return function() {
                        octopus.setCurrentCat(cat);
                        catView.render();
                    };

                } (cat));
                this.catListElem.appendChild(elem);

            }
        }
    };

    var catView = {
        init: function() {
            this.catContentAreaElem = document.getElementById("catContentArea");
            this.catNameElem = document.getElementById("catName");
            this.catImgElem = document.getElementById("catImg");
            this.catCountElem = document.getElementById("catCount");
            this.catImgElem.addEventListener("click", function() {
                octopus.incrementCounter();

            });
            this.render();


        },
        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catCountElem.textContent = currentCat.clickCount;
            this.catNameElem.textContent = currentCat.name;
            this.catImgElem.src = currentCat.src;

        }
    };

    var catAdminView = {
        init: function() {
            this.enableAdminArea = false;
            this.catImgNameTBElem = document.getElementById("imgName");
            this.catUrlTBElem = document.getElementById("imgUrl");
            this.catImgClickTBElem = document.getElementById("imgClick");
            this.adminFormAreaElem = document.getElementById("adminFormArea");
            this.adminAreaBtnElem = document.getElementById("adminBtn");
            this.saveElem = document.getElementById("save");
            this.cancelElem = document.getElementById("cancel");
            this.adminAreaBtnElem.addEventListener("click", function(event) {
                catAdminView.enableAdminArea = catAdminView.enableAdminArea ? false : true;
                catAdminView.render();
            });
            this.saveElem.addEventListener("click", function(event) {
                this.enableAdminArea = false;
                var catAdminDetails = catAdminView.getEnteredCatDetails();
                octopus.setEnteredCatDetails(catAdminDetails);
                this.render();

            }.bind(this));
            this.cancelElem.addEventListener("click", function(event) {
                this.enableAdminArea = false;
                this.render();
            }.bind(this));
            this.render();
        },
        getEnteredCatDetails: function() {
            return {
                name: this.catImgNameTBElem.value,
                src: this.catUrlTBElem.value,
                clickCount: parseInt(this.catImgClickTBElem.value, 0)
            };

        },

        render: function() {
            this.enableAdminArea ? this.adminFormAreaElem.style.display = "block" : this.adminFormAreaElem.style.display = "none";
        }
    };

    octopus.init();

});
