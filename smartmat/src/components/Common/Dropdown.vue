<script>
export default {
    name: 'SearchDropdown',
    props: {
        name: {
            type: String,
            required: false,
            default: 'input',
        },
        options: {
            type: Array,
            required: true,
            default: [],
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Søk etter vare',
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        maxItem: {
            type: Number,
            required: false,
            default: 10,
        },
    },
    data() {
        return {
            selected: {},
            optionsShown: false,
            searchFilter: '',
        };
    },
    created() {
        //this.$emit('selected', this.selected);
    },
    computed: {
        filteredOptions() {
            const filtered = [];
            const regex = new RegExp(this.searchFilter, 'ig');
            for (const option of this.options) {
                if (this.searchFilter.length < 1 || option.name.match(regex)) {
                    if (filtered.length < this.maxItem) filtered.push(option);
                } else {
                    if (filtered.length > this.maxItem) filtered.push('option');
                }
            }
            return filtered;
        },
    },
    methods: {
        selectOption(option) {
            this.selected = option;
            this.optionsShown = false;
            this.searchFilter = this.selected.name;
            this.$emit('selected', this.selected);
        },
        showOptions() {
            if (!this.disabled) {
                this.searchFilter = '';
                this.optionsShown = true;
            }
        },
        exit() {
            if (!this.selected.id) {
                this.selected = {};
                this.searchFilter = '';
            } else {
                this.searchFilter = this.selected.name;
            }
            this.optionsShown = false;
        },
        // Selecting when pressing Enter
        keyMonitor: function (event) {
            if (event.key === 'Enter' && this.filteredOptions[0])
                this.selectOption(this.filteredOptions[0]);
        },
    },
    watch: {
        searchFilter() {
            if (this.filteredOptions.length === 0) {
                this.selected = {};
            } else {
                this.selected = this.filteredOptions[0];
            }
            this.$emit('filter', this.searchFilter);
        },
    },
};
</script>
<template>
    <div class="dropdown" v-if="options">
        <div id="dropdownToggle" class="dropdown-toggle">
            <input id="dropdownInput"
                :name="name"
                @focus="showOptions()"
                @blur="exit()"
                @keyup="keyMonitor"
                v-model="searchFilter"
                :disabled="disabled"
                :placeholder="placeholder"
            />
        </div>
            <ul class="dropdown-menu" v-show="optionsShown">
                <li
                    @mousedown="selectOption(option)"
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                >
                    <a href="javascript:void(0)">
                        {{ option.name || option.id || '-' }}
                    </a>
                </li>
            </ul>
    </div>
</template>

<style scoped>

@import "../../assets/style/dropDown.css";
</style>