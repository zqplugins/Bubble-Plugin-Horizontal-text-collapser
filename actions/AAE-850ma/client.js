function(properties, context) {

    // The goal is to turn this <div>text content</div> into this  <div><span id="smallie">Text content</span></div>

    var myDiv = document.getElementById(properties.element_id);

    var myDivChildHoldingText = myDiv.querySelector('.content');

    var spanId = `${properties.element_id}Span`;

    myDiv.style.width = "100%";

    myDivChildHoldingText.innerHTML = `<span id="${spanId}">${myDivChildHoldingText.innerHTML}</span>`;

    var mySpan = document.getElementById(spanId);
    var spanWidth = mySpan.getBoundingClientRect().width;

    myDiv.style.width = spanWidth + properties.extra_pixels_on_sides + 'px';


    var observer = new MutationObserver(function (mutations) {
		
        // tip: I disconnect it here, in other words, stop listening to changes in the element, to prevent an infinite loop.
        // since I change the element in the code, it will trigger again the mutation event that says the element was changed
        // which will change the element again, triggering the mutation event again, which will... you got it by now.
        // the only change I want to observe is for when Bubble changes the text content
        
        observer.disconnect();

        mutations.forEach(function (mutation) {

            var spanId = `${properties.element_id}Span`;
            var oldBgColor = myDiv.style.backgroundColor;

            myDiv.style.width = "100%";

            myDivChildHoldingText.innerHTML = `<span id="${spanId}">${myDivChildHoldingText.innerHTML}</span>`;

            var mySpan = document.getElementById(spanId);
            var spanWidth = mySpan.getBoundingClientRect().width;

            myDiv.style.width = spanWidth + properties.extra_pixels_on_sides + 'px';

        });


        observer.observe(myDivChildHoldingText, observerConfig);

    });

    // Notify me of everything!
    var observerConfig = {
        childList: true,
    };

    // Node, config
    // In this case we'll listen to all changes to body and child nodes
    observer.observe(myDivChildHoldingText, observerConfig);


}