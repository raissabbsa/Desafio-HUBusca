import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { UserProvider } from "./src/userData";

export function App() {
    const ctx = require.context("./app");
    return (
        <UserProvider>
            <ExpoRoot context={ctx} />
        </UserProvider>
        );
}

registerRootComponent(App);