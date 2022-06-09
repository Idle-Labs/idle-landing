
export default function anchors(enableScroll: boolean, mobileMenu?) {
    const anchors: NodeListOf<HTMLElement> = document.querySelectorAll('.anchor-item');

    anchors.forEach(anchor => {
        if (enableScroll) {
            anchor.addEventListener('click', e => {
                e.preventDefault();

                if (mobileMenu && mobileMenu.isOpen){
                    mobileMenu.toggleState();
                }
                window.scrollTo({
                    top: document.querySelector(`#${anchor.dataset.anchor}`).getBoundingClientRect().y + scrollY,
                    behavior: 'smooth',
                });
            });
        }
    });
}
