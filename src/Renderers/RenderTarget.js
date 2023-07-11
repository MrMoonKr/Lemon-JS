import Color from '../Color';
import Context from '../Context';
import RenderTask from './RenderTask';
import Scene from '../Scene/Scene';

/**
 * A rendering target
 *
 * @category Rendering
 */
class RenderTarget {
    /**
     * Constructor
     */
    constructor() {
        /**
         * A reference to the active task
         *
         * @type {null|RenderTask}
         * @protected
         */
        this.activeTask = null;

        /**
         * Context instance
         *
         * @type {Context}
         * @protected
         */
        this.context = new Context();

        /**
         * Tasks to execute
         *
         * @type {Array.<RenderTask>}
         * @protected
         */
        this.tasks = [];

        /**
         * The render API to use
         *
         * @type {RenderAPI}
         * @protected
         */
        this.renderApi = null;
    }

    /**
     * Clear the rendering target
     *
     * @param {?Color} color A Color instance
     */
    clear(color = new Color(30, 30, 30)) { }

    /**
     * Create a new task
     *
     * @return {number} RenderTask's index
     */
    createTask() {
        this.tasks.push(new RenderTask());
        return (this.tasks.length - 1);
    }

    /**
     * Display
     */
    display() {
        for (let i = 0; i < this.tasks.length; i += 1) {
            this.tasks[i].execute(this.renderApi);
        }
    }

    /**
     * Render the given scene
     *
     * @param {Scene} scene A Scene instance
     * @param {Camera} camera A Camera instance
     */
    render(scene, camera) {
        // Clear render API cache
        this.renderApi.clearCache();

        // Set default camera
        this.renderApi.setActiveCamera(camera);

        // Ensure at least one task is alive
        if (!this.getActiveTask()) {
            this.setActiveTask(this.createTask());
        }

        // Manage the scene
        scene.visit(this);
    }

    /**
     * Set the task with the given index active
     *
     * @param {number} index An integer representing task's index
     */
    setActiveTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.activeTask = this.tasks[index];
        }
    }

    /**
     * Get the active task
     *
     * @return {?RenderTask} A RenderTask or null
     */
    getActiveTask() {
        return this.activeTask;
    }

    /**
     * Remove all the tasks in memory
     */
    removeTasks() {
        this.tasks.length = 0;
        this.activeTask = null;
    }

    /**
     * Get the render API
     *
     * @return {RenderAPI} A Render API instance
     */
    getRenderAPI() {
        return this.renderApi;
    }

    /**
     * Get size
     *
     * @return {Array.<number>} A array with size on x and y
     */
    getSize() {
        return this.context.getSize();
    }

    /**
     * Get width
     *
     * @return {!number} Width in pixels
     */
    getWidth() {
        return this.context.getSize()[0];
    }

    /**
     * Get height
     *
     * @return {!number} Height in pixels
     */
    getHeight() {
        return this.context.getSize()[1];
    }
}

export default RenderTarget;
