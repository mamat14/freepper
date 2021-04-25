import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import LayoutWithHeaderAndFooter from "../components/Layout/LayoutWithHeaderAndFooter";

export default function Attributions() {
  return (
    <LayoutWithHeaderAndFooter>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h1">Иконки</Typography>
            <div>
              Icons made by{" "}
              <a href="https://smashicons.com/" title="Smashicons">
                Smashicons
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            <div>
              Icons made by{" "}
              <a href="" title="photo3idea_studio">
                photo3idea_studio
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            <div>
              Icons made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
            <div>
              Icons made by{" "}
              <a href="" title="Kiranshastry">
                Kiranshastry
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </ListItemText>
        </ListItem>
      </List>
    </LayoutWithHeaderAndFooter>
  );
}
