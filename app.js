
const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }
    console.log('current class name: ' + className);
});


/*
//Custom Cursor//

// SVG Blob Cursor
const blobCursor = document.createElement('div');
blobCursor.id = 'blob-cursor';
blobCursor.innerHTML = `
  <svg width="40" height="40" viewBox="0 0 40 40">
    <ellipse id="blob-shape" cx="20" cy="20" rx="16" ry="16" fill="#fff"/>
  </svg>
`;
document.body.appendChild(blobCursor);

let mouseX = 0, mouseY = 0, blobX = 0, blobY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate blob position with inertia
function animateBlob() {
  blobX += (mouseX - blobX) * 0.18;
  blobY += (mouseY - blobY) * 0.18;
  blobCursor.style.transform = `translate(${blobX - 20}px, ${blobY - 20}px)`;

  // Morph the ellipse for a blobby effect
  const rx = 14 + Math.sin(Date.now() / 200) * 4;
  const ry = 14 + Math.cos(Date.now() / 300) * 4;
  document.getElementById('blob-shape').setAttribute('rx', rx);
  document.getElementById('blob-shape').setAttribute('ry', ry);

  requestAnimationFrame(animateBlob);
}
animateBlob();

/*

//paper.js lil snake//

// Adapted from the following Processing example:
// http://processing.org/learning/topics/follow3.html

// The amount of points in the path:
var points = 25;

// The distance between the points:
var length = 35;

var path = new Path({
	strokeColor: '#E4141B',
	strokeWidth: 20,
	strokeCap: 'round'
});

var start = view.center / [10, 1];
for (var i = 0; i < points; i++)
	path.add(start + new Point(i * length, 0));

function onMouseMove(event) {
	path.firstSegment.point = event.point;
	for (var i = 0; i < points - 1; i++) {
		var segment = path.segments[i];
		var nextSegment = segment.next;
		var vector = segment.point - nextSegment.point;
		vector.length = length;
		nextSegment.point = segment.point - vector;
	}
	path.smooth({ type: 'continuous' });
}

function onMouseDown(event) {
	path.fullySelected = true;
	path.strokeColor = '#e08285';
}

function onMouseUp(event) {
	path.fullySelected = false;
	path.strokeColor = '#e4141b';
}