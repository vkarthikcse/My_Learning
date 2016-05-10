/*
    =================================================
    Code to change the hash and add id to anchor tags
    =================================================
*/
/*Variable that holds browsing[forward,back,refresh] functionality data*/
var AVX_HASHID = AVX_HASHID || Object.create(null);
/*Variable to enable document title functionality*/
AVX_HASHID.enableChangeDocumentTitle = true;
/* Identify the manual click[1] and script automated click[0] */
AVX_HASHID.clickTrigger = 0;
/* Hash id and alias mapping*/
AVX_HASHID.hashAliasMap = {};
/* Dynamic attribute added to modules*/
AVX_HASHID.customAttributeToAnchorTags = "data-id";
/* Attribute to be read for method call of modules*/
AVX_HASHID.attributeToReadMethodCallFromAnchorTags = "href";
/* Attribute to be added for non standard nav tabs*/
AVX_HASHID.attributeToAssignMethodCallsForTabsAnchorTag = "onclick";
/*Flag to enable whole back button functionality*/
AVX_HASHID.enableBackButton = true;
/* Flag to enable dynamic attributes added to main menu*/
AVX_HASHID.enableProcessMainMenu = true && AVX_HASHID.enableBackButton;
/* Flag to enable dynamic attributes added to nav tabs*/
AVX_HASHID.enableProcessNavTabs = true && AVX_HASHID.enableBackButton;
/* Flag to enable hash change event*/
AVX_HASHID.enableHashChangeEvent = true && AVX_HASHID.enableBackButton;
/* Flag to enable multiple hashes loaded code*/
AVX_HASHID.enableMultipleHashesLoad = true && AVX_HASHID.enableBackButton;
/*Flag to enable param navigation in url */
AVX_HASHID.enableUrlParamNavigationCompleted = false;
/* Flag to check multiple hashes loaded*/
AVX_HASHID.urlCompletedFlag = true;
/*Flag to enable ui_clickEvents recording used for debugging*/
AVX_HASHID.enableUiClickEvents = true;
/* Flag to print the logs in console*/
AVX_HASHID.debug = true;
/* Hash loaded in URL*/
AVX_HASHID.urlLoadedFromClickEvent = AVX_HASHID.urlLoadedFromClickEvent || [];
/* Hash to be loaded in URL*/
AVX_HASHID.urlToLoadFromHash = AVX_HASHID.urlToLoadFromHash || [];
/* Hash loaded in URL*/
AVX_HASHID.urlLoadedFromHash = AVX_HASHID.urlLoadedFromHash || [];
/* Contains multiple hashes to be loaded*/
AVX_HASHID.hashIdArray = AVX_HASHID.hashIdArray || [];
/* hash change method call count*/
AVX_HASHID.hashChangeDetectCount = 0;
/*Collect clicked element data for debugging */
var ui_clickEvents = ui_clickEvents || {};
/*Contain the complete element details for debugging*/
ui_clickEvents.completeData = ui_clickEvents.completeData || [];
/*Elements event trigger type for click events*/
AVX_HASHID.tType = ["Manual", "Script"];
/*Elements location to track click events*/
AVX_HASHID.zone = ["Main Menu", "Nav Tab", "Action Item"];

/*Method to add the click eleemnt data to array*/
ui_clickEventsFunction = function(that, type, zone) {

    var tempData = {
        "scriptTriggerType": type,
        "class": $(that).attr("class") || "No Class",
        "id": $(that).attr("id") || "No Id",
        "text": $(that).text().replace(/[^a-z0-9]/gmi, "") || $(that).attr("data-content") || "No Text",
        "zone": zone,
        "toLoad": $(that).attr("href") || $(that).attr("onclick") || "No href"
    };
    var tempLength = ui_clickEvents.completeData.length;

    if (tempLength === 0) {
        ui_clickEvents.completeData[length] = tempData;
    } else if (tempLength > 0 && JSON.stringify(ui_clickEvents.completeData[length - 1]) !== JSON.stringify(tempData)) {
        ui_clickEvents.completeData.push(tempData);
    }
};

/*Method to bind ui_clickEventsFunction to the action icons */
AVX_HASHID.bindActionIconsFunction = function(e) {
    ui_clickEventsFunction(e.currentTarget, AVX_HASHID.tType[0], AVX_HASHID.zone[2]);
};

/*
 =======================================================
 Method to change document title according to breadcrumb
 =======================================================
*/

AVX_HASHID.changeDocumentTitle = function() {
    /* executes whenever an AJAX request completes */

    if ($("ol.breadcrumb > li")[0] !== undefined) {
        var documentTitle = "";
        if ($("ol.breadcrumb > li:first").text().trim() === "Dashboard") {
            documentTitle += "Dashboard";
        } else {
            $("ol.breadcrumb > li").filter(function() {
                documentTitle += $(this).text() + " > ";
            });
        }
        documentTitle += " - AppViewX";
        documentTitle = documentTitle.replace(">  -","-");
        document.title = documentTitle;
    }
};

/*
===============================
Method to print logs in console
===============================
*/

AVX_HASHID.debugFunction = function(logs) {

    if (AVX_HASHID.debug) {
        //console.log(logs);
        allLogs += "\n" + logs;
        //console.log(logs);
    }

};

/*
==========================================================
Method to reset the URL loaded and To load Value from HASH
==========================================================
*/

AVX_HASHID.resetUrlValue = function() {
    AVX_HASHID.urlToLoadFromHash = [];
    AVX_HASHID.urlLoadedFromHash = [];
    AVX_HASHID.urlCompletedFlag = true;
    AVX_HASHID.hashIdArray = [];
    AVX_HASHID.urlLoadedFromClickEvent = [];

};

/*
==========================================================
Method to return the data-id of active module in main menu
==========================================================
*/

AVX_HASHID.activeElementInMainMenuDataId = function() {

    return $($("#app-menu li.active")[$("#app-menu li.active").length - 1]).children('a').attr(AVX_HASHID.customAttributeToAnchorTags);
};

/*
==========================================================
Method to return the text of active module in main menu
==========================================================

*/

AVX_HASHID.activeElementInMainModule = function() {

    return $($("#app-menu li.active")[$("#app-menu li.active").length - 1]).children('a').text().trim().toLowerCase();
};

/*
===================================================
Method to create a 8 digit alias for the hash value
===================================================
*/

AVX_HASHID.createAlias = function(hashId) {
    var alias = "",
        i,
        j,
        aliasLength,
        loopCount;

    for (i = 0; i < hashId.length; i++) {
        alias += String.fromCharCode(((hashId.charCodeAt(i) + i) % 57) + 65);
    }
    aliasLength = alias.length;
    if (aliasLength - 8 >= 0) {
        loopCount = aliasLength - 8;
    } else {
        while (alias.length <= 8) {
            alias += alias;
        }
        aliasLength = alias.length;
        loopCount = aliasLength - 8;
    }
    for (i = 1; i <= loopCount; i++) {
        j = i % 8;
        alias = alias.slice(0, j) + alias.slice(j + 1);
    }
    alias = alias.replace(/[^a-zA-Z]/g, "a");
    AVX_HASHID.hashAliasMap[alias] = hashId;
    return alias;
};

/*
====================================================
Method to retrieve the hash value from 8 digit alias
====================================================
*/

AVX_HASHID.resolveAlias = function(alias) {
    return AVX_HASHID.hashAliasMap[alias];
};

/*
===============================================================
Method to find the url redirect when logged in using a bookmark
===============================================================
*/
// AVX_HASHID.urlRedirectAfterLogin = function() {

//     var urlLogin,
//         tempElement,
//         urlHash,
//         urlParam,
//         urlSplit;
//     urlLogin = sessionStorage.getItem("urlLogin");
//     sessionStorage.removeItem("urlLogin");
//     if (urlLogin !== "undefined" && urlLogin !== null) {
//         if (urlLogin.indexOf("?") == -1) {
//             urlHash = urlLogin;
//         } else {
//             urlSplit = urlLogin.split("?");
//             urlHash = urlSplit[0];
//             urlParam = urlSplit[1];
//         }
//         location.hash = urlHash;
//     } else {

//     }

//     alert(urlHash + "   " + urlParam);
// };

AVX_HASHID.urlRedirectAfterLogin = function() {
    var urlSplit;
    /* url,
        hash = this.urlHash,
        param = this.urlParam;
    if (hash !== undefined && hash !== null) {
        url = hash;
        if (param !== undefined && param !== null) {
            url += param;
        }
    }*/

    this.urlLogin = sessionStorage.getItem("urlLogin") || location.hash.split("#")[1];
    if (this.urlLogin !== "undefined" && this.urlLogin !== null && this.urlLogin !== undefined && this.urlHash !== this.urlLogin) {
        if (this.urlLogin.indexOf("?") == -1) {
            this.urlHash = this.urlLogin;
            this.urlParam = {};
        } else {
            urlSplit = this.urlLogin.split("?");
            this.urlHash = urlSplit[0];
            this.urlParam = AVX_HASHID.queryStringToJSON(urlSplit[1]);
            this.enableUrlParamNavigationCompleted = false;
        }
        this.tempUrlLogin = this.urlLogin;
    }

    sessionStorage.removeItem("urlLogin");
};



AVX_HASHID.queryStringToJSON = function(queryString) {

    return JSON.parse('{"' + decodeURIComponent(queryString).split("=").join('":"').split("&").join('","') + '"}');

    /* var pairs = queryString.split('&');
     var result = {};
     if (pairs.length !== 0) {
         pairs.forEach(function(pair) {
             pair = pair.split('=');
             result[pair[0]] = decodeURIComponent(pair[1] || '');
         });
     }
     return JSON.parse(JSON.stringify(result));*/
};

/*
==========================================================================
Method to navigate to the data table links present by passing params to it
==========================================================================
*/

AVX_HASHID.navigateToDataTableLinks = function(urlQueryObject) {


    switch (urlQueryObject.q) {
        case "cert_inv":
            if (typeof window["showCertGraphView"] === "function") {
                window["showCertGraphView"](urlQueryObject.cert_name, urlQueryObject.cert_id);
                AVX_HASHID.enableUrlParamNavigationCompleted = true;
            }
            break;

        default:
            break;
    }

};

/*
===============================================================================
Method to check whether multiple hashes are loaded during refresh or navigation
===============================================================================
*/

AVX_HASHID.urlToLoadFromHashFunctionForMultipleHashes = function() {
    /* Conditoin to enable multiple hash load*/

    if (AVX_HASHID.enableMultipleHashesLoad) {
        if (!AVX_HASHID.urlCompletedFlag) {
            if (location.hash.split("#")[1] === undefined) {
                AVX_HASHID.urlLoadedFromHash = location.hash.split("#")[1];
            } else if (location.hash.split("#").length >= 1 && location.hash.split("#")[1].indexOf("/") == -1) {
                AVX_HASHID.urlLoadedFromHash[0] = location.hash.split("#")[1];
            } else if (location.hash.split("#")[1].indexOf("/") !== -1) {
                AVX_HASHID.urlLoadedFromHash = location.hash.split("#")[1].split("/");
            }

            AVX_HASHID.debugFunction("Url loaded by new variable" + AVX_HASHID.urlLoadedFromClickEvent);
            var comparedIdToLoad = AVX_HASHID.compareUrlLoadedWithToLoad(AVX_HASHID.urlLoadedFromClickEvent, AVX_HASHID.urlToLoadFromHash);
            if (comparedIdToLoad.length <= 0) {
                AVX_HASHID.resetUrlValue();
            } else {
                AVX_HASHID.hashChangeDetect(comparedIdToLoad[0]);
            }

        }
        console.log("Load multiple");
    }
};

/*
=======================================================================
Method to check the hash value in URL and load the corresponding module
=======================================================================
*/

AVX_HASHID.hashChangeDetect = function(urlToLoadParam) {
    AVX_HASHID.debugFunction(AVX_HASHID.hashChangeDetectCount += 1);
    AVX_HASHID.hashIdArray = [].concat(urlToLoadParam);
    AVX_HASHID.hashIdArrayLength = AVX_HASHID.hashIdArray.length;

    if (AVX_HASHID.hashIdArray[0] !== "" && AVX_HASHID.hashIdArray[0] !== undefined) {
        if (AVX_HASHID.hashIdArrayLength <= 1) {
            AVX_HASHID.debugFunction('Triggering click event for ' + AVX_HASHID.hashIdArray[0]);
            if ($("[" + AVX_HASHID.customAttributeToAnchorTags + "=" + AVX_HASHID.hashIdArray[0] + "]")[0] !== undefined) {
                $("[" + AVX_HASHID.customAttributeToAnchorTags + "=" + AVX_HASHID.hashIdArray[0] + "]")[0].click();
            }
        } else if (AVX_HASHID.hashIdArrayLength > 1) {
            AVX_HASHID.urlCompletedFlag = false;
            for (var i = AVX_HASHID.hashIdArrayLength - 1; i >= 0; i--) {
                if ($("[" + AVX_HASHID.customAttributeToAnchorTags + "=" + AVX_HASHID.hashIdArray[i] + "]")[0] !== undefined) {
                    $("[" + AVX_HASHID.customAttributeToAnchorTags + "=" + AVX_HASHID.hashIdArray[i] + "]")[0].click();
                    break;
                }
            }
        }
    } else {
        AVX_HASHID.resetUrlValue();
        //AVX_HASHID.urlRedirectAfterLogin();
        var tempElement = $("#app-menu > li:first a");
        $(tempElement)[tempElement.length > 1 ? 1 : 0].click();
        /*AVX_HASHID.dashElement = $("[" + AVX_HASHID.customAttributeToAnchorTags + "=" + AVX_HASHID.createAlias('loadDashboard') + "]")[0];
        if (AVX_HASHID.dashElement !== undefined) {
            AVX_HASHID.dashElement.click();
        }*/
    }
};

/*
==============================================
Method called when popstate event is triggered
==============================================
*/

AVX_HASHID.popStateTimedMethod = function() {

    if (AVX_HASHID.clickTrigger === 0 && AVX_HASHID.urlCompletedFlag) {
        AVX_HASHID.debugFunction("Inside pop state event " + location.hash);
        AVX_HASHID.debugFunction("Hash change called..");
        AVX_HASHID.debugFunction("Hash change called even now..");
        AVX_HASHID.urlRedirectAfterLogin();
        if (AVX_HASHID.urlHash !== undefined && AVX_HASHID.urlHash !== "undefined") {
            location.hash = AVX_HASHID.urlHash;
        }

        if (location.hash.split("#")[1] !== undefined) {

            if (location.hash.split("#")[1].indexOf("/") !== -1) {
                AVX_HASHID.urlToLoadFromHash = location.hash.split("#")[1].split("/");
            } else {
                AVX_HASHID.urlToLoadFromHash[0] = location.hash.split("#")[1];
            }
            AVX_HASHID.hashChangeDetect(AVX_HASHID.urlToLoadFromHash);
        }
    }
    AVX_HASHID.clickTrigger = 0;

};

/*
===========================================================
Method to validate whether URL loaded and To load are equal
===========================================================
*/

AVX_HASHID.compareUrlLoadedWithToLoad = function(loaded, toLoad) {
    var idYetToLoad = [];
    $.grep(toLoad, function(el) {
        if ($.inArray(el, loaded) == -1) {
            AVX_HASHID.debugFunction(el + "The different index");
            idYetToLoad.push(el);
        }
    });
    AVX_HASHID.debugFunction("Difference in hahses");
    return idYetToLoad;
};

/*
======================================================================
Method to add data-id attribute to submodules and change hash on click
======================================================================
*/

AVX_HASHID.addingHrefAttributeToTabs = function() {
    /*Conditon check to enable change of anchor tags inside nav-tabs class*/
    if (AVX_HASHID.enableProcessNavTabs) {
        $(".nav.nav-tabs a").each(function(index, el) {
            var appHrefAttr = $(el).attr(AVX_HASHID.attributeToReadMethodCallFromAnchorTags),
                subModuleIdAttr,
                subModuleParamFlag;
            if (appHrefAttr !== undefined && appHrefAttr && appHrefAttr.split("")[0] !== "#") {
                subModuleParamFlag = appHrefAttr.indexOf("'");
                /*TODO Temporary fix for javascript url lint error. Need to handle or call methods using onclick event in the element. Applies globally*/
                subModuleIdAttr = appHrefAttr.replace(" javascript:".trim(), "").replace(".do", "").split("(")[1].split(")")[0].split(",")[0];
                if (subModuleIdAttr !== undefined && subModuleIdAttr !== "#" && subModuleParamFlag !== -1 && subModuleIdAttr !== "''" && subModuleIdAttr !== "") {
                    subModuleIdAttr = subModuleIdAttr.replace(/[^a-zA-Z]/g, "");
                    $(el).attr(AVX_HASHID.customAttributeToAnchorTags, AVX_HASHID.createAlias(subModuleIdAttr));
                } else if (subModuleIdAttr !== "''") {
                    subModuleIdAttr = appHrefAttr.replace(" javascript:".trim(), "").split("(")[0];
                    $(el).attr(AVX_HASHID.customAttributeToAnchorTags, AVX_HASHID.createAlias(subModuleIdAttr));
                }
            } else if (appHrefAttr === undefined) {
                var tabAttrHref = $(el).parent().attr("onclick"),
                    aliasAttrLocal;
                if (tabAttrHref !== undefined) {
                    aliasAttrLocal = tabAttrHref.split("(")[0] + $(el).text();
                    $(el).attr(AVX_HASHID.customAttributeToAnchorTags, AVX_HASHID.createAlias(aliasAttrLocal));
                    $(el).attr(AVX_HASHID.attributeToAssignMethodCallsForTabsAnchorTag, tabAttrHref);
                } else if ($($("#app-menu li.active")[$("#app-menu li.active").length - 1]).children('a').text().trim() === "Statistics") {
                    aliasAttrLocal = $(el).text().trim();
                    var statisticsSpanElement = $(el).find("span").first()[0];
                    var classToadd = $(statisticsSpanElement).attr('class').split(" ")[1];
                    $(el).attr(AVX_HASHID.customAttributeToAnchorTags, AVX_HASHID.createAlias(aliasAttrLocal));
                    if (statisticsSpanElement.hasAttribute('onclick')) {
                        $(el).attr('onclick', $(statisticsSpanElement).attr('onclick'));
                        $(statisticsSpanElement).removeAttr('onclick');
                    }
                }
                $(el).parent().removeAttr('onclick');
            }
            $(el).click(function(e) {
                if ($(el).parent().is(":first-child") && AVX_HASHID.activeElementInMainMenuDataId()) {
                    location.hash = AVX_HASHID.activeElementInMainMenuDataId();
                } else if ($(this).attr(AVX_HASHID.customAttributeToAnchorTags) !== undefined) {
                    if (AVX_HASHID.urlCompletedFlag !== false) {
                        location.hash = (AVX_HASHID.activeElementInMainMenuDataId() ? AVX_HASHID.activeElementInMainMenuDataId() + "/" : "") + $(this).attr(AVX_HASHID.customAttributeToAnchorTags);

                    } else {
                        if ($.inArray(AVX_HASHID.activeElementInMainMenuDataId(), AVX_HASHID.urlLoadedFromClickEvent) === -1) {
                            AVX_HASHID.urlLoadedFromClickEvent.push(AVX_HASHID.activeElementInMainMenuDataId());
                        }
                        AVX_HASHID.urlLoadedFromClickEvent.push($(this).attr(AVX_HASHID.customAttributeToAnchorTags));
                    }
                }

                if (e.clientX !== 0 && e.clientY !== 0) {
                    if (AVX_HASHID.enableUiClickEvents) {
                        ui_clickEventsFunction(el, AVX_HASHID.tType[0], AVX_HASHID.zone[1]);
                    }
                    AVX_HASHID.clickTrigger = 1;
                    AVX_HASHID.resetUrlValue();
                } else {
                    AVX_HASHID.clickTrigger = 0;
                    if (AVX_HASHID.enableUiClickEvents) {
                        ui_clickEventsFunction(el, AVX_HASHID.tType[1], AVX_HASHID.zone[1]);
                    }
                }

            });
        });
    }
};

/*
=================================================================
Method to bind click event and add data-id attribute to main menu
=================================================================
*/

AVX_HASHID.addingDataIdAttributeToMainMenu = function() {
    $('#app-menu a').each(function(index, el) {
        if ($(el).attr(AVX_HASHID.attributeToReadMethodCallFromAnchorTags) !== '#') {
            var appHrefAttr = $(el).attr(AVX_HASHID.attributeToReadMethodCallFromAnchorTags).replace(" javascript:".trim(), "").replace(".do", "");
            var hrefId = null;
            if (appHrefAttr.indexOf("'") != -1) {
                var reParam = /\'(.*)\'/;
                hrefId = appHrefAttr.match(reParam)[1];
            } else {
                hrefId = appHrefAttr.split('(')[0];
            }
            $(el).attr(AVX_HASHID.customAttributeToAnchorTags, AVX_HASHID.createAlias(hrefId));
        }

        $(el).click(function(e) {
            AVX_HASHID.debugFunction("Clicked an element");
            var tempHashVariable = $(this).attr(AVX_HASHID.customAttributeToAnchorTags);
            if (tempHashVariable !== undefined) {
                if (AVX_HASHID.urlCompletedFlag !== false) {
                    location.hash = $(this).attr(AVX_HASHID.customAttributeToAnchorTags);
                } else {
                    AVX_HASHID.urlLoadedFromClickEvent.push(tempHashVariable);
                }
                if (e.clientX !== 0 && e.clientY !== 0) {
                    if (AVX_HASHID.enableUiClickEvents) {
                        ui_clickEventsFunction(el, AVX_HASHID.tType[0], AVX_HASHID.zone[0]);
                    }
                    AVX_HASHID.clickTrigger = 1;
                    AVX_HASHID.debugFunction("Index captured");
                    AVX_HASHID.resetUrlValue();
                } else {
                    if (AVX_HASHID.enableUiClickEvents) {
                        ui_clickEventsFunction(el, AVX_HASHID.tType[1], AVX_HASHID.zone[0]);
                    }
                    AVX_HASHID.debugFunction("Index not captured");
                    AVX_HASHID.clickTrigger = 0;
                }
            } else {
                e.preventDefault();
            }
        });
        // $(el).attr(AVX_HASHID.attributeToReadMethodCallFromAnchorTags, "#" + $(el).attr(AVX_HASHID.attributeToReadMethodCallFromAnchorTags).replace("javascript:", ""));
    });

};

/* Logs to print */
var allLogs = "";

/*
===============================================
Conditon to enable document title functionality
===============================================
*/
$(document).ajaxComplete(function(event) {
    if (AVX_HASHID.enableChangeDocumentTitle) {
        AVX_HASHID.changeDocumentTitle();
    }

    if (AVX_HASHID.enableUiClickEvents) {
        if (AVX_HASHID.urlCompletedFlag) {
            $("#pageDiv").find(".primary-head-btn").each(function(index, el) {
                if ($(el).is("button") && $(el).attr("disabled") !== "disabled") {
                    $(el).off("click", AVX_HASHID.bindActionIconsFunction).on("click", AVX_HASHID.bindActionIconsFunction);
                }
            });
        }
    }


    if (AVX_HASHID.enableBackButton === true && AVX_HASHID.urlParam !== undefined && $.isEmptyObject(AVX_HASHID.urlParam) !== true && !AVX_HASHID.enableUrlParamNavigationCompleted) {
        AVX_HASHID.navigateToDataTableLinks(AVX_HASHID.urlParam);

    }


});

// Condition to enable hash change functionality
if (AVX_HASHID.enableHashChangeEvent) {

    $(window).on("hashchange", function(e) {});

    if ($.browser.msie) {
        window.onhashchange = function() {
            AVX_HASHID.debugFunction("msie");
            setTimeout(AVX_HASHID.popStateTimedMethod, 50);
        };
    } else {
        $(window).bind('popstate', function(e) {

            AVX_HASHID.debugFunction(e);
            setTimeout(AVX_HASHID.popStateTimedMethod, 50);
        });
    }
}

/*
===========================================================
Add data-id attribute dynamically  to the main menu modules
===========================================================
*/

$(window).load(function() {

    if (AVX_HASHID.enableProcessMainMenu) {
        AVX_HASHID.urlCompletedFlag = false;
        AVX_HASHID.urlRedirectAfterLogin();
        //AVX_HASHID.urlRedirectParam = AVX_HASHID.urlParam;
        if (AVX_HASHID.urlHash !== undefined && AVX_HASHID.urlHash !== "undefined") {
            location.hash = AVX_HASHID.urlHash;
        }
        sessionStorage.removeItem("urlLogin");
        AVX_HASHID.addingDataIdAttributeToMainMenu();
        AVX_HASHID.debugFunction(location.hash);
        if (location.hash.split("#")[1] === undefined) {
            AVX_HASHID.urlToLoadFromHash = location.hash.split("#")[1];

        } else if (location.hash.split("#").length >= 1 && location.hash.split("#")[1].indexOf("/") === -1) {

            AVX_HASHID.urlToLoadFromHash[0] = location.hash.split("#")[1];

        } else if (location.hash.split("#")[1].indexOf("/") !== -1) {
            AVX_HASHID.urlToLoadFromHash = location.hash.split("#")[1].split("/");
        }
        AVX_HASHID.hashChangeDetect(AVX_HASHID.urlToLoadFromHash);
    }

    // To dynamically bind the click event for href="#" links
    var dynamicBindAnchor = function() {
        clearInterval(tI);
        var hrefBind = function(e) {
            e.preventDefault();
        };

        $("#pageDiv").find("a").each(function(index, el) {
            if ($(el).attr("href") === "#" || $(el).attr("href") === "") {
            	$(el).attr("href","javascript:;");
            	$(el).off("click", hrefBind).on("click", hrefBind);
                
            }
        });
    };

    var tI = setInterval(dynamicBindAnchor, 300);
    $("#pageDiv").on("DOMNodeInserted DOMNodeRemoved hover", function(e) {
        clearInterval(tI);
        tI = setInterval(dynamicBindAnchor, 300);
    });

});
