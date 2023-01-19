// first we need to create a stage
var stage = new Konva.Stage({
  container: 'konva-holder',   // id of container <div>
  width: window.innerWidth,
  height: 500,
  stroke: 'black',
  strokeWidth: 8
});

stage.getContainer().style.border = '3px solid black'

// then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
});

var text = new Konva.Text({
  text: "Hello, World!",
  x: stage.width() / 2,
  y: stage.height() / 2,
  fontSize: 36,
  fill: 'navy',
  draggable: true
});

// add the shape to the layer
layer.add(circle);
layer.add(text);

// add the layer to the stage
stage.add(layer);



// IMAGE
// create an image object
var imageObj = new Image();
imageObj.src = "goat.jpg";

var image = new Konva.Image({
  x: 50,
  y: 50,
  image: imageObj,
  width: 100,
  height: 100
});

// create a new Konva.Group object
var group = new Konva.Group({
  x: 50,
  y: 50,
  draggable: true
});

// add the image to the group
group.add(image);

// add the group to the layer
layer.add(group);


// TRANSFORMER
// create a transformer
var transformer = new Konva.Transformer();
layer.add(transformer);

function addClickEventForTransformer() {
  // remove all existing click events
  layer.getChildren().forEach(function(node) {
    node.off('click');
  });
  layer.off('click');

  // add a click event to all shapes
  layer.getChildren().forEach(function(node) {
    node.on('click', function() {
      // check if the transformer is on the same shape
      if (transformer.nodes()[0] === this) {
        // hide the transformer
        transformer.hide();
      } else {
        // update the transformer with the new shape
        transformer.nodes([this]);
        // show the transformer
        transformer.show();
      }
      // force the layer to draw
      layer.draw();
    });
  });

  // add a click event to the background
  layer.on('click', function(e) {
    // check if the click was on a shape
    if(e.target === layer){
      //// hide the transformer when the background is clicked
      transformer.hide();
      // force the layer to draw
      layer.draw();
    }
  });
}

addClickEventForTransformer()


// IMAGE UPLOAD
function handleFileSelect() {
  var input = document.getElementById("fileInput");
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var imageObj = new Image();
    imageObj.src = event.target.result;

    imageObj.onload = function() {
      var image = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 300,
        height: 300
      });

      var group = new Konva.Group({
        x: 50,
        y: 50,
        draggable: true
      });

      group.add(image);
        layer.add(group);
        layer.draw();
      };
    };
    reader.readAsDataURL(file);
    
    addClickEventForTransformer()
}