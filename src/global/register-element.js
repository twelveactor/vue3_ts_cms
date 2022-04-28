import 'element-plus/dist/index.css';
import { ElAside, ElAvatar, ElButton, ElCheckbox, ElContainer, ElDatePicker, ElDropdown, ElDropdownItem, ElDropdownMenu, ElForm, ElFormItem, ElHeader, ElInput, ElLink, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup, ElOption, ElRadio, ElRow, ElCol, ElSelect, ElTabPane, ElTabs, ElBreadcrumb, ElBreadcrumbItem, ElTable, ElTableColumn, ElPagination, ElImage, ElDialog, ElTree, ElCard, ElCalendar } from 'element-plus';
const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElRadio,
    ElTabs,
    ElTabPane,
    ElCheckbox,
    ElLink,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElAvatar,
    ElCol,
    ElRow,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElImage,
    ElDialog,
    ElTree,
    ElCard,
    ElCalendar
];
export default function (app) {
    for (const component of components) {
        // console.log(component)
        //  component(name: string, component: Component): this;
        app.component(component.name, component);
    }
}
//# sourceMappingURL=register-element.js.map