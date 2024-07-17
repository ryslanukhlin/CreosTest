export interface Product {
    id: string;
    name: string;
    code: null | string;
    price: Price;
    image: Image;
    material: number;
}

interface Image {
    url: string;
}

interface Price {
    old_price: null | number;
    current_price: number;
}

export enum SortPriceEnum {
    ASC = "ASC",
    DESC = "DESC",
}

type Filter = {
    materialId: string;
    sortPrice: SortPriceEnum;
};

export interface ProductState {
    products: Product[];
    filter: Filter;
    basketProducts: string[];
    lovelyProducts: string[];
}

const initialState: ProductState = {
    products: [],
    filter: {
        materialId: "1",
        sortPrice: SortPriceEnum.ASC,
    },
    basketProducts: [],
    lovelyProducts: [],
};

export const useProductStore = defineStore("product", {
    state: () => initialState,
    getters: {
        getProducts(state: ProductState) {
            let materialId = state.filter.materialId,
                sortPrice = state.filter.sortPrice;
            return state.products
                .filter((product) => {
                    if (product.material === +materialId && product)
                        return product;
                })
                .sort((a, b) => {
                    if (sortPrice === SortPriceEnum.ASC) {
                        return a.price.current_price - b.price.current_price;
                    } else {
                        return b.price.current_price - a.price.current_price;
                    }
                });
        },
    },
    actions: {
        initProducts(product: Product[]) {
            this.products = product;
        },
        setFilterPriceSort(sort: SortPriceEnum) {
            this.filter.sortPrice = sort;
        },
        setFilterMaterialSort(materialId: string) {
            this.filter.materialId = materialId;
        },
        addToBasket(product: string) {
            if (this.basketProducts.includes(product)) return;
            localStorage.setItem(
                "basketProducts",
                JSON.stringify([...this.basketProducts, product])
            );
            this.basketProducts.push(product);
        },
        addToLovely(product: string) {
            if (this.lovelyProducts.includes(product)) {
                this.lovelyProducts.splice(
                    this.lovelyProducts.indexOf(product),
                    1
                );
                localStorage.setItem(
                    "lovelyProducts",
                    JSON.stringify([...this.lovelyProducts])
                );
                return;
            }
            localStorage.setItem(
                "lovelyProducts",
                JSON.stringify([...this.lovelyProducts, product])
            );
            this.lovelyProducts.push(product);
        },
        setToBasket(products: string[]) {
            this.basketProducts = products;
        },
        setToLovely(products: string[]) {
            this.lovelyProducts = products;
        },
    },
});
