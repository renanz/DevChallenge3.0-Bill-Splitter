import { createAppContainer, createStackNavigator } from "react-navigation";
import Bill from "./containers/Bill";
import Friends from "./containers/Friends";
import Home from "./containers/Home";
import SplittedBill from "./containers/SplittedBill";

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Bill: Bill,
    Friends: Friends,
    SplittedBill: SplittedBill
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;