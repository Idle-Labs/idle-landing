export default class DropDown {
    mainLink: HTMLElement;
    subMenuLinks: NodeListOf<Element>;
    dropLink: HTMLElement;
    enBtn: HTMLElement;
    esBtn: HTMLElement;
    btnMob: NodeListOf<Element>;
    ulrParam: URLSearchParams;

    constructor(btn: HTMLElement) {
        this.ulrParam = new URLSearchParams;
        this.dropLink = btn || document.querySelector('.has-drop-down');
        this.mainLink = this.dropLink.querySelector('.drop-down-link');
        this.subMenuLinks = this.dropLink.querySelectorAll('.drop-down-link--sub');

        this.mainLink.addEventListener('click', e => {
            e.preventDefault();
            this.dropLink.classList.toggle('active');
        });

        this.mainLink.addEventListener('blur', () => {
            this.dropLink.classList.remove('active');
        });

        document.body.addEventListener('click', (e) => {
            // @ts-ignore
            if (e.target !== this.mainLink && (e.target.parentNode !== this.dropLink && !e.target.classList.contains('js-btn-switch'))) {
                this.dropLink.classList.remove('active');
            }
        });
    }
}

export function createDropdowns() {
    const _btn = document.querySelectorAll('.has-drop-down') as NodeListOf<HTMLElement>;
    _btn.forEach((item) => new DropDown(item));
}
