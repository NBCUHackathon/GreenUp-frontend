/**
 * Created by isabella on 3/28/15.
 */
Polymer('search-page', {

    domReady: function () {

    }
});


window.addEventListener('template-bound', function(){
    var sandbox = document.getElementById('sandbox');
    sandbox.dateSelected = function(ev, detail, sender){
        this.updateDateInputValue();
    }
    sandbox.updateDateInputValue = function(){
        sandbox.$.dateinput.value = PolymerExpressions.prototype.date(this.selectedDate);
    }
    sandbox.colors = [
        '#f44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#9E9E9E',
        '#607D8B'
    ];
    sandbox.selectColor = function(ev, detail, sender){
        var selectedColor = sender.getAttribute('color');
        sandbox.selectedColor = selectedColor;
        CoreStyle.g.dCalendar.accentColor = selectedColor;
    }
    sandbox.selectedColor = '#2196F3';

    sandbox.updateDateInputValue();
})