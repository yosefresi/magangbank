$(document).ready(function(){

    // show list of products on first load
    showProducts();
// when a 'read products' button was clicked
    $(document).on('click', '.read-products-button', function(){
        showProducts();
    });

});

// function to show list of products
function showProducts(){
// get list of products from the API
    $.getJSON("http://localhost/coba-API/products/read.php", function(data){
        // html for listing products
        var read_products_html="";

// when clicked, it will load the create products form
        read_products_html+="<div id='create-products' class='btn btn-primary pull-right m-b-15px create-products-button'>";
        read_products_html+="<span class='glyphicon glyphicon-plus'></span> Create Product";
        read_products_html+="</div>";

        // start table
        read_products_html+="<table class='table table-bordered table-hover'>";

        // creating our table heading
        read_products_html+="<tr>";
        read_products_html+="<th class='w-25-pct'>Name</th>";
        read_products_html+="<th class='w-10-pct'>Price</th>";
        read_products_html+="<th class='w-15-pct'>Category</th>";
        read_products_html+="<th class='w-25-pct text-align-center'>Action</th>";
        read_products_html+="</tr>";

        // loop through returned list of data
        $.each(data.records, function(key, val) {

            // creating new table row per record
            read_products_html+="<tr>";

            read_products_html+="<td>" + val.name + "</td>";
            read_products_html+="<td>$" + val.price + "</td>";
            read_products_html+="<td>" + val.category_name + "</td>";

            // 'action' buttons
            read_products_html+="<td>";
            // read one products button
            read_products_html+="<button class='btn btn-primary m-r-10px read-one-products-button' data-id='" + val.id + "'>";
            read_products_html+="<span class='glyphicon glyphicon-eye-open'></span> Read";
            read_products_html+="</button>";

            // edit button
            read_products_html+="<button class='btn btn-info m-r-10px update-products-button' data-id='" + val.id + "'>";
            read_products_html+="<span class='glyphicon glyphicon-edit'></span> Edit";
            read_products_html+="</button>";

            // delete button
            read_products_html+="<button class='btn btn-danger delete-products-button' data-id='" + val.id + "'>";
            read_products_html+="<span class='glyphicon glyphicon-remove'></span> Delete";
            read_products_html+="</button>";
            read_products_html+="</td>";

            read_products_html+="</tr>";

        });

// end table
        read_products_html+="</table>";
// inject to 'page-content' of our app
        $("#page-content").html(read_products_html);

        // chage page title
        changePageTitle("Read Products");

    });
}

$(document).ready(function(){

    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-products-button', function(){
        // load list of categories
        $.getJSON("http://localhost/coba-api/category/read.php", function(data){
            // build categories option html
// loop through returned list of data
            var categories_options_html="";
            categories_options_html+="<select name='category_id' class='form-control'>";
            $.each(data.records, function(key, val){
                categories_options_html+="<option value='" + val.id + "'>" + val.name + "</option>";
            });
            categories_options_html+="</select>";
            // we have our html form here where product information will be entered
// we used the 'required' html5 property to prevent empty fields
            var create_product_html="";

// 'read products' button to show list of products
            create_product_html+="<div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>";
            create_product_html+="<span class='glyphicon glyphicon-list'></span> Read Products";
            create_product_html+="</div>";

            // 'create product' html form
            create_product_html+="<form id='create-product-form' action='#' method='post' border='0'>";
            create_product_html+="<table class='table table-hover table-responsive table-bordered'>";

            // name field
            create_product_html+="<tr>";
            create_product_html+="<td>Name</td>";
            create_product_html+="<td><input type='text' name='name' class='form-control' required /></td>";
            create_product_html+="</tr>";

            // price field
            create_product_html+="<tr>";
            create_product_html+="<td>Price</td>";
            create_product_html+="<td><input type='number' min='1' name='price' class='form-control' required /></td>";
            create_product_html+="</tr>";

            // description field
            create_product_html+="<tr>";
            create_product_html+="<td>Description</td>";
            create_product_html+="<td><textarea name='description' class='form-control' required></textarea></td>";
            create_product_html+="</tr>";

            // categories 'select' field
            create_product_html+="<tr>";
            create_product_html+="<td>Category</td>";
            create_product_html+="<td>" + categories_options_html + "</td>";
            create_product_html+="</tr>";

            // button to submit form
            create_product_html+="<tr>";
            create_product_html+="<td></td>";
            create_product_html+="<td>";
            create_product_html+="<button type='submit' class='btn btn-primary'>";
            create_product_html+="<span class='glyphicon glyphicon-plus'></span> Create Product";
            create_product_html+="</button>";
            create_product_html+="</td>";
            create_product_html+="</tr>";

            create_product_html+="</table>";
            create_product_html+="</form>";

            // inject html to 'page-content' of our app
            $("#page-content").html(create_product_html);

// chage page title
            changePageTitle("Create Product");

        });
    });

    // will run if create product form was submitted
    $(document).on('submit', '#create-product-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: "http://localhost/coba-API/products/create.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // product was created, go back to products list
                showProducts();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});