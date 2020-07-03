let buyMeCoffee = document.getElementById('btnCoffee');

  chrome.storage.sync.get('color', function(data) {
    buyMeCoffee.style.backgroundColor = data.color;
    buyMeCoffee.setAttribute('value', data.color);
  });

  buyMeCoffee.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };