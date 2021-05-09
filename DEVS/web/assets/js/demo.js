var events = [
  {'Date': new Date(2019, 11, 25), 'Title': 'Joyeux Noel !'},
  {'Date': new Date(2019, 11, 18), 'Title': 'Star Wars épisode IX : The Rise of Skywalker', 'Link': 'https://www.youtube.com/watch?v=P94M4jlrytQ'},
  {'Date': new Date(2019, 12, 1), 'Title': 'Bonne Année !', 'Link': 'https://youtu.be/3Uo0JAUWijM'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
