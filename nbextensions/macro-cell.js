/*
    Add this file to $(ipython locate)/nbextensions/macro-cell.js
*/
define( function () {

    // Try to read JSON file specifying cell macros
    $.getJSON("/static/custom/database.json", function(data) {
        //cach DOM
        var $container = $("div#maintoolbar-container");

        var tag = $("<span></span>").attr("class", "navbar-text")
                                    .text("Databases:");

        var dbselect = $("<select></select>").attr("id", "dbselect");

        $.each(data['databases'], function(key, cell) {
            var option = $("<option></option>")
                         .attr("value", cell['name'])
                         .text(cell['name'])
                         .attr("info", cell['info'].join('\n'));
                         dbselect.append(option);
        });

        $container.append(tag);
        $container.append(dbselect);

        // Add a button to the toolbar for inserting a macro cell
        IPython.toolbar.add_buttons_group([{
            // The button's label.
            'label': 'database connection',

            // The button's icon.
            // See a list of Font-Awesome icons here:
            // http://fortawesome.github.io/Font-Awesome/icons/
            'icon': 'icon-renren',

            // The callback function.
            'callback': function() {
                //cach DOM
                var selected = $("select#dbselect").find(":selected");

                //create new cell
                var new_cell = IPython.notebook.insert_cell_above('code');
                new_cell.set_text(selected.attr("info"));
                new_cell.focus_cell();

                //make database connections
                var command = "cur = "+selected.attr("value")+".cursor()";
                console.log("Executing Command: " + command);
                var kernel = IPython.notebook.kernel;
                kernel.execute(command);
            }
        }]);
    });

});
