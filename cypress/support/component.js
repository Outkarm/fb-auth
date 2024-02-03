import { mount } from 'cypress/react';

// This function mounts a component and returns the mount object.
// You can use this function to interact with the component in your tests.
const mountComponent = (component) => {
    return mount(component, {
        shallow: true,
    });
};

// This function logs the rendered HTML of a component.
const logComponentHTML = (component) => {
    const mount = mountComponent(component);
    console.log(mount.html());
};

// This function logs the props of a component.
const logComponentProps = (component) => {
    const mount = mountComponent(component);
    console.log(mount.props());
};

export { mountComponent, logComponentHTML, logComponentProps };
