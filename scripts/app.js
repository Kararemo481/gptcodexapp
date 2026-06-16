const loadedNode = document.querySelector('[data-runtime="loaded"]');
const viewportNode = document.querySelector('[data-runtime="viewport"]');

function formatViewport() {
  return `${window.innerWidth} x ${window.innerHeight}`;
}

function updateRuntimeDetails() {
  if (loadedNode) {
    loadedNode.textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (viewportNode) {
    viewportNode.textContent = formatViewport();
  }
}

updateRuntimeDetails();
window.addEventListener('resize', updateRuntimeDetails);
