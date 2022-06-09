import Splide, { Components, Options } from '@splidejs/splide';
import { EventInterface } from '@splidejs/splide';

export default function createSplideSlider(slider: HTMLElement, sliderSettings: Options){
    return new Splide(slider, sliderSettings);
}

export function MyTransition(Splide: Splide, Components: Components) {
  const { bind } = EventInterface(Splide);
  const { Move } = Components;
  const { list } = Components.Elements;

  let endCallback;

  function mount() {
    bind(list, 'transitionend', e => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }

  function start(index, done) {
    const destination = Move.toPosition(index, true);

    list.style.transition = 'transform 833ms cubic-bezier(0.47, 0.00, 0.52, 1.00)';

    Move.translate(destination);
    endCallback = done;
  }

  function cancel() {
    list.style.transition = '';
  }

  return {
    mount,
    start,
    cancel,
  };
}
