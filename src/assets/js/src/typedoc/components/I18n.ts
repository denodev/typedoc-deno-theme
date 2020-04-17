/// <reference path='../utils/pointer.ts' />
/// <reference path='../Component.ts' />
/// <reference path='../Application.ts' />

namespace typedoc {
    export class I18n extends Component {
        /**
         * Create a new I18n instance.
         *
         * @param options  Backbone view constructor options.
         */
        constructor(options: IComponentOptions) {
            super(options);

            this.el.addEventListener('click', e => this.onClick(e));
        }

        onClick(e: Event) {
            this.el.classList.toggle('on')
        }
    }

    /**
     * Register this component.
     */
    registerComponent(I18n, '.tsd_i18n');
}
