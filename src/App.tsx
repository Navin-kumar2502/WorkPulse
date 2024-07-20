import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated,
} from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {useNotificationProvider} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import { dataProvider,liveProvider,authProvider } from './providers';
import {Home,ForgotPasswordPage,RegisterPage, CompanyList, LoginPage} from './pages';

import { App as AntdApp} from "antd"
import { Layout } from './components/layout';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {UnsavedChangesNotifier, DocumentTitleHandler, CatchAllNavigate } from "@refinedev/react-router-v6";
import {resources } from './components/config/resources';
import Create from './pages/company/create';
import EditPage from './pages/company/edit';
import TaskListPage from './pages/tasks/list';
import CreateTask from './pages/tasks/create';
import EditTask from './pages/tasks/edit';
import { UpdatePasswordPage } from './pages/updatePassword/update-password';

function App() {
    return (
        <BrowserRouter>
        <RefineKbarProvider>
            <AntdApp>
                <DevtoolsProvider>
                    <Refine dataProvider={dataProvider}
                    liveProvider={liveProvider}
                    notificationProvider={useNotificationProvider}
                    routerProvider={routerBindings}
                    authProvider={authProvider} 
                    resources={resources}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            projectId: "9Xvlt0-pNoTnF-ThtGUI",
                            liveMode: "auto",
                        }}
                    >
                            <Routes>
                                <Route path='/register' element={<RegisterPage/>} />
                                <Route path='/login' element={<LoginPage/>} />
                                <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
                                <Route path="/update-password" element={<UpdatePasswordPage/>}/>
                                <Route
                                element={
                                <Authenticated
                                    key="authenticated-layout"
                                    fallback={<CatchAllNavigate to="/login"/>}
                                >
                                    <Layout>
                                        <Outlet/>
                                    </Layout>
                                </Authenticated>
                                }>
                                    <Route index element={<Home />} />
                                    <Route path='/companies'>
                                        <Route path='/companies' element={<CompanyList/>}/>
                                        <Route path='new' element={<Create/>}/>
                                        <Route path='edit/:id' element={<EditPage/>}/>
                                    </Route>
                                    <Route path='/tasks' element={
                                        <TaskListPage>
                                            <Outlet/>
                                        </TaskListPage>
                                    }>
                                        <Route path='new' element={<CreateTask/>}/>
                                        <Route path='edit/:id' element={<EditTask/>}/>
                                    </Route>
                                </Route>
                            </Routes>
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                    </Refine>
                <DevtoolsPanel />
                </DevtoolsProvider>
            </AntdApp>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
