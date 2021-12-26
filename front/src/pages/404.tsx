import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import LayoutWithHeaderAndFooter from "../components/Layout/LayoutWithHeaderAndFooter";

export default function Custom404() {
  return (
    <>
      <LayoutWithHeaderAndFooter disableBreadcrumbs>
        <Box
          width="100vw"
          height="400px"
          className="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" component="h1">
            Страница не найдена
          </Typography>
        </Box>
      </LayoutWithHeaderAndFooter>
    </>
  );
}
