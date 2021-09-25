import { useEffect } from 'react';
import { useAttribution } from './attribution';
import { useLeafletContext } from './context';
import { useEventHandlers } from './events';
import { withPane } from './pane';
export function useLayerLifecycle(element, context) {
  useEffect(function addLayer() {
    const container = context.layerContainer ?? context.map;
    container.addLayer(element.instance);
    return function removeLayer() {
      var _context$layersContro;

      (_context$layersContro = context.layersControl) == null ? void 0 : _context$layersContro.removeLayer(element.instance);
      context.map.removeLayer(element.instance);
    };
  }, [context, element]);
}
export function createLayerHook(useElement) {
  return function useLayer(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    return elementRef;
  };
}