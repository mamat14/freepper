import {Product} from "@mamat14/shop-server/shop_model";
import {cartStateKey, shopClient} from "../../store";
import {Container} from "@material-ui/core";
import React from "react";
import LayoutWithHeader from "../../components/Layout/LayoutWithHeader";
import {GetServerSideProps} from "next";
import Cookie from 'cookie';
import {CartState} from "../../components/Cart/Cart";
import CartNoProps from "../../components/Cart/CartNoProps";

export default function CartPage({products}: { products: Product[] }) {
    return (
        <LayoutWithHeader>
            <Container maxWidth={"sm"}>
                <CartNoProps initialProducts={new Map(products.map(p => [p.id, p]))}/>
            </Container>
        </LayoutWithHeader>
    );
}

export function parseCartData(cookieHeader?: string): CartState {
    const defaultCartState = {selectedProducts: []};
    try {
        const actualCartState = JSON.parse(Cookie.parse(cookieHeader || '')[cartStateKey] || '{}');
        return Object.assign(defaultCartState, actualCartState);
    } catch (e) {
        //consider error recovery
        //1.log.error 2.reset-cookies
        return defaultCartState;
    }
}

export async function requestCartProducts(cartState: CartState): Promise<Map<string, Product>> {
    const productPromises = cartState.selectedProducts
        .map((p) => shopClient.getProduct(
            {name: `categories/beds-category/products/${p.id}`}
        ).then((product): [string, Product] => [p.id, product]));
    return new Map(await Promise.all(productPromises));
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cartState = parseCartData(context.req.headers.cookie);
    console.log(JSON.stringify(cartState));
    const products: Map<string, Product> = await requestCartProducts(cartState);
    return {
        props: {
            products: [...products.values()]
        }
    }
};
