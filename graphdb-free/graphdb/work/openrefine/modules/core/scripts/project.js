/*

Copyright 2010, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

 * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
 * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

var theProject;
var ui = {};

var lang = (navigator.language|| navigator.userLanguage).split("-")[0];
var dictionary = "";
$.ajax({
	url : "command/core/load-language?",
	type : "POST",
	async : false,
	data : {
	  module : "core",
//		lang : lang
	},
	success : function(data) {
		dictionary = data;
	}
});
$.i18n.setDictionary(dictionary);
// End internationalization

var Refine = {
  refineHelperService: "http://openrefine-helper.freebaseapps.com"
};

Refine.reportException = function(e) {
  if (window.console) {
    console.log(e);
  }
};

function resize() {
  var leftPanelWidth = 300;
  var width = $(window).width();
  var top = $("#header").outerHeight() + 25;
  var height = $(window).height() - top;

  var leftPanelPaddings = ui.leftPanelDiv.outerHeight(true) - ui.leftPanelDiv.height();
  ui.leftPanelDiv
  .css("top", top + "px")
  .css("left", "0px")
  .css("height", (height - leftPanelPaddings) + "px")
  .css("width", leftPanelWidth + "px");

  var leftPanelTabsPaddings = ui.leftPanelTabs.outerHeight(true) - ui.leftPanelTabs.height();
  ui.leftPanelTabs.height(ui.leftPanelDiv.height() - leftPanelTabsPaddings);

  var rightPanelVPaddings = ui.rightPanelDiv.outerHeight(true) - ui.rightPanelDiv.height();
  var rightPanelHPaddings = ui.rightPanelDiv.outerWidth(true) - ui.rightPanelDiv.width();

  ui.rightPanelDiv
  .css("top", top + "px")
  .css("left", leftPanelWidth + "px")
  .css("height", (height - rightPanelVPaddings) + "px")
  .css("width", (width - leftPanelWidth - rightPanelHPaddings) + "px");

  ui.viewPanelDiv.height((height - ui.toolPanelDiv.outerHeight() - rightPanelVPaddings) + "px");

  var processPanelWidth = 400;
  ui.processPanelDiv
  .css("width", processPanelWidth + "px")
  .css("left", Math.floor((width - processPanelWidth) / 2) + "px");

  if($('.ui-tabs').tabs('option', 'active') == 2){
    $('#left-panel').css('width', '100%');
    $('#right-panel').css('display', 'none');
  }
  else{
    $('#left-panel').css('width', '300px');
    $('#right-panel').css('display', 'block');
  }
}

function resizeTabs() {
  var totalHeight = ui.leftPanelDiv.height() + 10;
  var headerHeight = ui.leftPanelTabs.find(".ui-tabs-nav").outerHeight(true);

  var visibleTabPanels = ui.leftPanelTabs.find(".ui-tabs-panel:not(.ui-tabs-hide)");
  var paddings = visibleTabPanels.outerHeight(true) - visibleTabPanels.height();

  var allTabPanels = ui.leftPanelTabs.find(".ui-tabs-panel");
  allTabPanels.height(totalHeight - headerHeight - paddings - 1);
}

function resizeAll() {
  resize();
  resizeTabs();
  ui.extensionBar.resize();
  ui.browsingEngine.resize();
  ui.processPanel.resize();
  ui.historyPanel.resize();
  ui.dataTableView.resize();
}

function initializeUI(uiState) {
  $("#loading-message").hide();
  $("#notification-container").hide();
  $("#project-title").show();
  $("#project-controls").show();
  $("#body").show();

  $("#or-proj-open").text($.i18n._('core-project')["open"]+"...");
  $("#project-permalink-button").text($.i18n._('core-project')["permalink"]);
  $("#project-name-button").attr("title",$.i18n._('core-project')["proj-name"]);
  $("#or-proj-export").text($.i18n._('core-project')["export"]);
  $("#or-proj-help").text($.i18n._('core-project')["help"]);
  $("#or-proj-starting").text($.i18n._('core-project')["starting"]+"...");
  $("#or-proj-facFil").text($.i18n._('core-project')["facet-filter"]);
  $("#or-proj-undoRedo").text($.i18n._('core-project')["undo-redo"]);
  $("#or-proj-ext").text($.i18n._('core-project')["extensions"]+":");

  $( window ).unload(function() {
    if (localStorage["yasr_yasr_container_results"]) {
      localStorage.removeItem("yasr_yasr_container_results");
    }
  });

  $('#project-permalink-button').mouseenter(function() {
    this.href = Refine.getPermanentLink();
  });
  $('#project-sparql-button').mouseenter(function() {
    this.href = Refine.getSparqlLink();
  });

  $('#project-sparql-button').click(function(e) {
    e.preventDefault();
    Refine.createEditPopup("Press Ctrl+C / Cmd+C to copy to clipboard", Refine.getAbsoluteSparqlLink(), "scripts/views/data-table/editor-endpoint-permalink.html");
  });

  $('#project-permalink-button').click(function(e) {
    e.preventDefault();
    Refine.createEditPopup("Press Ctrl+C / Cmd+C to copy to clipboard", Refine.getAbsolutePermanentLink(), "scripts/views/data-table/editor-endpoint-permalink.html");
  });

  $('#project-name-button, #project-title .icon-edit.text-primary').click(function(){
    Refine.createEditPopup("Project name:", theProject.metadata.name, "scripts/views/data-table/editor-project-name.html");
  });

  Refine.setTitle();

  ui = DOM.bind($("#body"));

  ui.extensionBar = new ExtensionBar(ui.extensionBarDiv); // construct the menu first so we can resize everything else
  ui.exporterManager = new ExporterManager($("#export-button"));

  ui.leftPanelTabs.tabs({ selected: 0 });
  resize();
  resizeTabs();

  ui.summaryBar = new SummaryBar(ui.summaryBarDiv);
  ui.browsingEngine = new BrowsingEngine(ui.facetPanelDiv, uiState.facets || []);
  ui.processPanel = new ProcessPanel(ui.processPanelDiv);
  ui.historyPanel = new HistoryPanel(ui.historyPanelDiv, ui.historyTabHeader);
  ui.dataTableView = new DataTableView(ui.viewPanelDiv);

  ui.leftPanelTabs.bind('tabsshow', function(event, tabs) {
    if (tabs.index === 0) {
      ui.browsingEngine.resize();
    } else if (tabs.index === 1) {
      ui.historyPanel.resize();
    }
  });

  $(window).bind("resize", resizeAll);

  if (uiState.facets) {
    Refine.update({ engineChanged: true });
  }

  $(document).keyup(function(e) {
    if (e.keyCode === 27) { // escape key maps to keycode `27`
      $('.dialog-container.ui-draggable').remove();
      $('.dialog-overlay').remove();
    }
  });

  if($('#extension-bar-menu-container').is(':empty')){
    $('#extension-bar').hide();
  }

  var yasqe = undefined;
  var yasr = undefined;

  $('#sparql-refine-button').click(function(){
    if(this.innerText === "SPARQL"){
      $(window).unbind("resize", resizeAll);
      this.innerText = "REFINE";
      $('#view-panel, #refine-tabs-sparql, .ui-tabs-nav, #summary-bar').toggle();
      $('#tool-panel').css('background', 'rgba(17, 176, 161, 0.3)');
      $('#left-panel').css('display', 'none');
      $('#right-panel').css('background', 'transparent').css('left', '0').css('width', '100%').css('height', '100%').css('padding-left', '0').css("overflow-y", "scroll");
      var endpoint = '../rdf-bridge/' + $('#project-sparql-button').context.URL.split("=").pop();
      if (yasqe === undefined || yasr === undefined){
        yasqe = YASQE($("#yasr_container"), {
          sparql: {
            showQueryButton: true,
            endpoint: endpoint,
            acceptHeaderGraph: "application/rdf+json,*/*;q=0.9",
            callbacks: {
              beforeSend: function(state, self){
                $('#refine-tabs-sparql').css('height', 'inherit');
                //console.log(state, self.data);
                // var query = self.data;
                // Refine.checkQuery(query);
                $('.no-results.sparql-tab').hide();
                $('.yasr_results').hide();
                $('.yasr_header').hide();
                $('#onto-loader').show();
              },
              complete: function(){
                showResultsHideLoader();

              },
              error: function(){
                showResultsHideLoader();
              },
              success: function(){
                showResultsHideLoader();
                setTimeout(function(){
                  yasr.resultsContainer.find('.dataTables_filter').append(yasr.resultsContainer.find('.dataTables_filter label input[type=search]').attr('placeholder', 'Filter query results').addClass('form-control'));
                  yasr.resultsContainer.find('.dataTables_filter label').remove();
                  $('.yasr_btn').click(function(){
                    yasr.resultsContainer.find('.dataTables_filter').append(yasr.resultsContainer.find('.dataTables_filter label input[type=search]').attr('placeholder', 'Filter query results').addClass('form-control'));
                    yasr.resultsContainer.find('.dataTables_filter label').remove();
                    checkHeightOfTheResultsTable();
                  });
                  checkHeightOfTheResultsTable();
                    $('.resultsTable.dataTable').addClass('table table-striped table-bordered fixedCellWidth');
                }, 1);
              }
            }
          }
        });

        yasr = YASR($("#yasr_container"), {
          getUsedPrefixes: yasqe.getPrefixesFromQuery,
            iDisplayLength: 1000
        });
        yasqe.options.sparql.callbacks.complete = yasr.setResponse;
        $('.yasr_header').hide();
          yasr.plugins.table.options.datatable.pageLength = 1000;
      }

      if($('#onto-loader').length === 0){
        $('.yasr').append('<div id="onto-loader"></div>');
        Refine.createOntoLoader();
      }
    }
    else{
      this.innerText = "SPARQL";
      $(window).bind("resize", resizeAll);
      $('#view-panel, #refine-tabs-sparql, .ui-tabs-nav, #summary-bar').toggle();
      $('#tool-panel').css('background', 'transparent');
      $('#right-panel').css('background', 'rgba(17, 176, 161, 0.3)').css('padding-left', '3px').css("overflow-y", "hidden");
      $('#left-panel').css('display', 'block');
      resizeAll();
      Refine.update({ engineChanged: true });
    }
  });
}

Refine.checkQuery = function(query){

};

function showResultsHideLoader(){
    $('.yasr_results').show();
    $('.yasr_header').show();
    $('#onto-loader').hide();
}

function checkHeightOfTheResultsTable(){
  if($('.resultsTable').height() < 500){
    $('#refine-tabs-sparql').css('height', 'inherit');
  }
  else{
    $('#refine-tabs-sparql').css('height', 'initial')
  }
}

Refine.createEditPopup = function(info, text, templateUrl){
  var menu = MenuSystem.createMenu().addClass("data-table-cell-editor").width("400px");
  menu.html(DOM.loadHTML("core", templateUrl));
  var elmts = DOM.bind(menu);
  elmts.or_views_dataType.html(info);
  elmts.cancelButton.html($.i18n._('core-buttons')["cancel"]);
  MenuSystem.showMenu(menu, function(){});
  elmts.textarea
      .text(text)
      .keydown(function(evt) {
        if (!evt.shiftKey) {
          if (evt.keyCode == 13) {
            if (evt.ctrlKey) {
              elmts.okallButton.trigger('click');
            } else {
              elmts.okButton.trigger('click');
            }
          } else if (evt.keyCode == 27) {
            MenuSystem.dismissAll();
          }
        }
      })
      .select()
      .focus();
  menu.css('right', '220px');
  if(elmts.okButton){
    elmts.okButton.html($.i18n._('core-buttons')["apply"]);
    elmts.okButton.click(function(){
      Refine._renameProject($('.data-table-cell-editor-editor').val());
      Refine.setTitle();
      MenuSystem.dismissAll();
    });
    menu.css('left', '220px');
  }
  elmts.cancelButton.click(function() {
    MenuSystem.dismissAll();
  });
}

Refine.createOntoLoader = function(){
  var circles = [{cx:"21.5", cy:"7.5", r:"1.5", fill:"#ff3900"},
    {cx:"31", cy:"10", r:"4", fill:"#ff3900"},
    {cx:"37", cy:"15", r:"2", fill:"#ff3900"},
    {cx:"40.5", cy:"23.5", r:"4.5", fill:"#ff3900"},
    {cx:"39", cy:"33", r:"3", fill:"#ff3900"},
    {cx:"34.5", cy:"38.5", r:"1.5", fill:"#ff3900"},
    {cx:"29", cy:"42", r:"2", fill:"#ff3900"},
    {cx:"21.5", cy:"42.5", r:"2.5", fill:"#ff3900"},
    {cx:"12", cy:"39", r:"4", fill:"#ff3900"},
    {cx:"7", cy:"32", r:"2", fill:"#ff3900"},
    {cx:"5.5", cy:"25.5", r:"2.5", fill:"#ff3900"},
    {cx:"8", cy:"16", r:"4", fill:"#ff3900"},
    {cx:"14",cy:"10", r:"3", fill:"#ff3900"}];

    var animations = [{repeatCount:"indefinite", dur:"2s", begin:"0s", values:"1.5; 3; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.15s", values:"4; 8; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.3s", values:"2; 4; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.45s", values:"4.5; 9; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5; 4.5", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.6s", values:"3; 6; 3; 3; 3; 3; 3; 3; 3; 3; 3; 3; 3", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.75s", values:"1.5; 3; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5; 1.5", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"0.9s", values:"2; 4; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.05s", values:"2.5; 5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.2s", values:"4; 8; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.35s", values:"2; 4; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2; 2", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.5s", values:"2.5; 5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5; 2.5", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.65s", values:"4; 8; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4; 4", attributeType:"XML", attributeName:"r" },
        {repeatCount:"indefinite", dur:"2s", begin:"1.8s", values:"3; 6; 3; 3; 3; 3; 3; 3; 3; 3; 3; 3; 3", attributeType:"XML", attributeName:"r" }]

    var svgnode = document.createElementNS('http://www.w3.org/2000/svg','svg');
    circles.forEach(function (e, i) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle.setAttributeNS(null,"id","circle_" + i);
        circle.setAttributeNS(null,"cx",e.cx);
        circle.setAttributeNS(null,"cy",e.cy);
        circle.setAttributeNS(null,"r",e.r);
        circle.setAttributeNS(null,"fill",e.fill);
        svgnode.appendChild(circle)
        var animateion = document.createElementNS("http://www.w3.org/2000/svg","animate");
        animateion.setAttributeNS(null,"repeatCount",animations[i].repeatCount);
        animateion.setAttributeNS(null,"dur",animations[i].dur);
        animateion.setAttributeNS(null,"begin",animations[i].begin);
        animateion.setAttributeNS(null,"values",animations[i].values);
        animateion.setAttributeNS(null,"attributeType",animations[i].attributeType);
        animateion.setAttributeNS(null,"attributeName",animations[i].attributeName);
        circle.appendChild(animateion);
    });
    svgnode.setAttributeNS(null,"width","5%");
    svgnode.setAttributeNS(null,"height","5%");
    svgnode.setAttributeNS(null,"preserveAspectRatio","xMinYMin");
    svgnode.setAttributeNS(null,"viewBox","0 0 50 50");
    svgnode.setAttributeNS(null,"id","onto-loader-yasr");
    svgnode.setAttributeNS(null,"version","1.1");
    document.getElementById("onto-loader").appendChild(svgnode);
    $('#onto-loader').hide();
};

Refine.setTitle = function(status) {
  var title = theProject.metadata.name + " - OpenRefine";
  if (status) {
    title = status + " - " + title;
  }
  document.title = title;

  $("#project-name-button").text(theProject.metadata.name);
};

Refine.reinitializeProjectData = function(f, fError) {
  $.getJSON(
    "command/core/get-project-metadata?" + $.param({ project: theProject.id }), null,
    function(data) {
      if (data.status == 'error') {
        alert(data.message);
        if (fError) {
          fError();
        }
      } else {
        theProject.metadata = data;
        $.getJSON(
          "command/core/get-models?" + $.param({ project: theProject.id }), null,
          function(data) {
            for (var n in data) {
              if (data.hasOwnProperty(n)) {
                theProject[n] = data[n];
              }
            }
            f();
          },
          'json'
        );
      }
    },
    'json'
  );
};

Refine._renameProject = function(name) {
  if (name === null) {
    return;
  }

  name = $.trim(name);
  if (theProject.metadata.name == name || name.length === 0) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "command/core/rename-project",
    data: { "project" : theProject.id, "name" : name },
    dataType: "json",
    success: function (data) {
      if (data && typeof data.code != 'undefined' && data.code == "ok") {
        theProject.metadata.name = name;
        Refine.setTitle();
      } else {
        alert($.i18n._('core-index')["error-rename"]+" " + data.message);
      }
    }
  });
};

/*
 *  Utility state functions
 */

Refine.createUpdateFunction = function(options, onFinallyDone) {
  var functions = [];
  var pushFunction = function(f) {
    var index = functions.length;
    functions.push(function() {
      f(functions[index + 1]);
    });
  };

  pushFunction(function(onDone) {
    ui.historyPanel.update(onDone);
  });
  if (options.everythingChanged || options.modelsChanged || options.columnStatsChanged) {
    pushFunction(Refine.reinitializeProjectData);
  }
  if (options.everythingChanged || options.modelsChanged || options.rowsChanged || options.rowMetadataChanged || options.cellsChanged || options.engineChanged) {
    pushFunction(function(onDone) {
      ui.dataTableView.update(onDone);
    });
    pushFunction(function(onDone) {
      ui.browsingEngine.update(onDone);
    });
  }

  functions.push(onFinallyDone || function() {});

  return functions[0];
};

Refine.update = function(options, onFinallyDone) {
  var done = false;
  var dismissBusy = null;

  Refine.setAjaxInProgress();

  Refine.createUpdateFunction(options, function() {
    Refine.clearAjaxInProgress();

    done = true;
    if (dismissBusy) {
      dismissBusy();
    }
    if (onFinallyDone) {
      onFinallyDone();
    }
  })();

  window.setTimeout(function() {
    if (!done) {
      dismissBusy = DialogSystem.showBusy();
    }
  }, 500);
};

Refine.postCoreProcess = function(command, params, body, updateOptions, callbacks) {
  Refine.postProcess("core", command, params, body, updateOptions, callbacks);
};

Refine.postProcess = function(moduleName, command, params, body, updateOptions, callbacks) {
  updateOptions = updateOptions || {};
  callbacks = callbacks || {};

  params = params || {};
  params.project = theProject.id;

  body = body || {};
  if (!("includeEngine" in updateOptions) || updateOptions.includeEngine) {
    body.engine = JSON.stringify(
        "engineConfig" in updateOptions ?
            updateOptions.engineConfig :
              ui.browsingEngine.getJSON()
    );
  }

  var done = false;
  var dismissBusy = null;

  function onDone(o) {
    done = true;
    if (dismissBusy) {
      dismissBusy();
    }

    Refine.clearAjaxInProgress();

    if (o.code == "error") {
      if ("onError" in callbacks) {
        try {
          callbacks.onError(o);
        } catch (e) {
          Refine.reportException(e);
        }
      } else {
        alert(o.message);
      }
    } else {
      if ("onDone" in callbacks) {
        try {
          callbacks.onDone(o);
        } catch (e) {
          Refine.reportException(e);
        }
      }

      if (o.code == "ok") {
        Refine.update(updateOptions, callbacks.onFinallyDone);

        if ("historyEntry" in o) {
          ui.processPanel.showUndo(o.historyEntry);
        }
      } else if (o.code == "pending") {
        if ("onPending" in callbacks) {
          try {
            callbacks.onPending(o);
          } catch (e) {
            Refine.reportException(e);
          }
        }
        ui.processPanel.update(updateOptions, callbacks.onFinallyDone);
      }
    }
  }

  Refine.setAjaxInProgress();

  $.post(
    "command/" + moduleName + "/" + command + "?" + $.param(params),
    body,
    onDone,
    "json"
  );

  window.setTimeout(function() {
    if (!done) {
      dismissBusy = DialogSystem.showBusy();
    }
  }, 500);
};

Refine.setAjaxInProgress = function() {
  $(document.body).attr("ajax_in_progress", "true");
};

Refine.clearAjaxInProgress = function() {
  $(document.body).attr("ajax_in_progress", "false");
};

/*
 *  Utility model functions
 */

Refine.cellIndexToColumn = function(cellIndex) {
  var columns = theProject.columnModel.columns;
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    if (column.cellIndex == cellIndex) {
      return column;
    }
  }
  return null;
};
Refine.columnNameToColumn = function(columnName) {
  var columns = theProject.columnModel.columns;
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    if (column.name == columnName) {
      return column;
    }
  }
  return null;
};
Refine.columnNameToColumnIndex = function(columnName) {
  var columns = theProject.columnModel.columns;
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    if (column.name == columnName) {
      return i;
    }
  }
  return -1;
};

Refine.fetchRows = function(start, limit, onDone, sorting) {
  var body = {
    engine: JSON.stringify(ui.browsingEngine.getJSON())
  };
  if (sorting) {
    body.sorting = JSON.stringify(sorting);
  }

  $.post(
    "command/core/get-rows?" + $.param({ project: theProject.id, start: start, limit: limit }) + "&callback=?",
    body,
    function(data) {
      theProject.rowModel = data;

      // Un-pool objects
      for (var r = 0; r < data.rows.length; r++) {
        var row = data.rows[r];
        for (var c = 0; c < row.cells.length; c++) {
          var cell = row.cells[c];
          if ((cell) && ("r" in cell)) {
            cell.r = data.pool.recons[cell.r];
          }
        }
      }

      if (onDone) {
        onDone();
      }
    },
    "jsonp"
  );
};

Refine.getPermanentLink = function() {
  var params = [
    "project=" + encodeURIComponent(theProject.id),
    "ui=" + encodeURIComponent(JSON.stringify({
      facets: ui.browsingEngine.getFacetUIStates()
    }))
  ];
  return "project?" + params.join("&");
};

Refine.getAbsolutePermanentLink = function() {
  return $("#project-permalink-button")[0].href;
}

Refine.getSparqlLink = function() {
  return "../rdf-bridge/" + encodeURIComponent(theProject.id);
};

Refine.getAbsoluteSparqlLink = function() {
  return $("#project-sparql-button")[0].href;
};

/*
 * Loader
 */

function onLoad() {
  var params = URL.getParameters();
  if ("project" in params) {
    var uiState = {};
    if ("ui" in params) {
      try {
        uiState = JSON.parse(decodeURIComponent(params.ui));
      } catch (e) {
      }
    }

    Refine.reinitializeProjectData(
      function() {
        initializeUI(uiState);
      },
      function() {
        $("#loading-message").hide();
      }
    );
  }
}

$(onLoad);
