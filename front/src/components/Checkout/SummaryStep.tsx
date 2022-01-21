import React, { memo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Image from "next/image";
import { connect } from "react-redux";
import { CartProduct, CartState, StoreState } from "store";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import {
  getDeliveryOptionName,
  getDeliveryProviderName,
  OrderForm,
} from "./Definitions";
import Spacing from "../Commons/Spacing";

type Column<T> = {
  name: string;
  extractor: (product: T) => string;
};

const useStyles = makeStyles((theme) => ({
  tableCell1: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
  },
  tableCell2: {},
}));

const formSummaryColumns: Column<OrderForm>[] = [
  {
    name: "Имя",
    extractor: (t: OrderForm) => t?.name || "Отсутствует",
  },
  {
    name: "Телефон",
    extractor: (t: OrderForm) => t?.phone || "Отсутствует",
  },
  {
    name: "Способ доставки",
    extractor: (t: OrderForm) =>
      getDeliveryOptionName(t?.deliveryOption) || "Отсутствует",
  },
  {
    name: "Служба доставки",
    extractor: (t: OrderForm) =>
      getDeliveryProviderName(t?.deliveryProvider) || "Отсутствует",
  },
  {
    name: "Адрес",
    extractor: (t: OrderForm) =>
      `${t?.city} Отделение номер ${t?.warehouseNumber}`,
  },
];

function FormSummaryTable({ orderForm }: { orderForm: OrderForm }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant="h4">Доставка</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formSummaryColumns.map((col) => (
            <TableRow key={col.name}>
              <TableCell className={classes.tableCell1} colSpan={1}>
                {col.name}
              </TableCell>
              <TableCell className={classes.tableCell2} colSpan={3}>
                {col.extractor(orderForm)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Summary({
  cartState,
  orderForm,
}: {
  cartState: CartState;
  orderForm: OrderForm;
}) {
  const theme = useTheme();
  const cartProducts = Object.values(cartState.selectedProducts);
  const invoiceShipping = 0;
  const invoiceSubtotal = cartState.total;
  const invoiceTotal = invoiceShipping + invoiceSubtotal;
  const columns: Column<CartProduct>[] = [
    {
      name: "Цена",
      extractor: (p: CartProduct) => `${p.price.price.toString()} ₴`,
    },
    {
      name: "Количество",
      extractor: (p: CartProduct) => p.count.toString(),
    },
    {
      name: "Сумма",
      extractor: (p: CartProduct) =>
        `${(p.count * p.price.price).toString()} ₴`,
    },
  ];

  const fullWidth = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Typography align="center" variant="h3">
        Проверьте заказ
      </Typography>
      <Paper>
        <Box marginTop={1}>
          <Box className="flex flex-col">
            <Box
              paddingX={2}
              paddingY={1}
              className="flex justify-between items-center"
            >
              <Typography variant="h4">Корзина</Typography>
              <Typography variant="h5">
                <Typography variant="body1" display="inline">
                  на сумму:
                </Typography>
                {invoiceTotal} ₴
              </Typography>
            </Box>
            <Divider />
            {cartProducts.map((product, i, arr) => (
              <Box key={product.id} margin={1}>
                <Grid
                  container
                  spacing={2}
                  justify="space-between"
                  alignItems="center"
                  direction={fullWidth ? "row" : "column"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    className="flex justify-start items-center self-start"
                  >
                    <Image
                      className="rounded"
                      width={72}
                      height={72}
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                    />
                    <Box paddingLeft={1}>
                      <Typography variant="h6">
                        {product.displayName}
                      </Typography>
                    </Box>
                  </Grid>
                  <Spacing
                    spacing={2}
                    xs={12}
                    sm={7}
                    wrap="nowrap"
                    className="flex-no-wrap justify-center items-center"
                    item
                  >
                    {columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex flex-col justify-center"
                      >
                        <div>
                          <Typography color="textSecondary" variant="caption">
                            {col.name}
                          </Typography>
                        </div>
                        <div>
                          <Typography align="center">
                            {col.extractor(product)}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </Spacing>
                </Grid>
                {i !== arr.length - 1 ? <Divider /> : false}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
      <Box marginTop={1}>
        <FormSummaryTable orderForm={orderForm} />
      </Box>
    </>
  );
}
function mapStateToProps(state: StoreState) {
  return {
    cartState: state.cartState,
  };
}

export type SummaryProps = { orderForm: OrderForm };
export default connect(mapStateToProps, null)(memo(Summary));