# Advanced PID Controller for Node-RED

This project provides a versatile and user-friendly PID (Proportional-Integral-Derivative) controller package for Node-RED. It began as a fork of `node-red-contrib-easy-pid-controller` and has been significantly enhanced with advanced features for more flexible process control.

The package includes the main **Advanced PID Controller** node and several **Companion Nodes** to make building control flows intuitive and clean, especially for beginners.

-----

## Features

  - **Multiple Operational Modes**: Switch between **Auto**, **Manual**, and **Off** modes on the fly.
  - **Auto Mode Enable**: A dedicated input to pause or resume the controller while in Auto mode, useful for multi-device coordination.
  - **Advanced PID Settings**: Includes **Deadband** configuration to prevent output oscillation around the setpoint.
  - **Anti-Windup**: The controller's output is clamped between configurable minimum and maximum limits.
  - **Dedicated Outputs**: The node features three separate outputs for the full status object, a simple boolean "enable" signal, and the direct analog output value.
  - **Companion Nodes**: A set of helper nodes to provide clear, topic-free inputs for Setpoint (SV), Process Value (PV), Mode, Manual Value, and Auto Enable.
  - **Easy Configuration**: All PID parameters (Kp, Ki, Kd), timing, and limits are easily configured in the node's editor.

-----

## Installation

Run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install node-red-contrib-advanced-pid-controller
```

-----

## Usage

This package contains multiple nodes that appear in the function category of the palette.

### 1\. The Main Controller

The core of the package is the `advanced-pid-controller` node. Configure its PID parameters in the properties dialog. This node receives all inputs via messages with specific topics.

### 2\. Companion Nodes (Recommended)

For easier and more readable flows, use the companion nodes to feed data into the main controller:

  - **Setpoint (SV)**: Feeds a numerical payload as the controller's setpoint.
  - **Process Value (PV)**: Feeds a numerical payload as the current process value.
  - **Mode**: Feeds a numerical payload (0, 1, or 2) to set the operational mode.
  - **Manual Value**: Feeds a numerical payload as the output value for manual mode.
  - **Auto Enable**: Feeds a boolean payload to pause or resume the controller in auto mode.

A typical flow looks like this:

```
[Inject SV]  --> [Setpoint (SV)]    \
[Sensor Data]--> [Process Value (PV)] -- > [advanced-pid-controller] --> Outputs...
[Select Mode]--> [Mode]             /
[Enable Logic]-> [Auto Enable]      /
```

-----

## Node Reference

### `advanced-pid-controller`

#### Inputs

The node accepts messages with the following `msg.topic` values:

  - **`mode`** (`integer`): Sets the operational mode:
      - `0`: **Auto** - The PID controller is active.
      - `1`: **Manual** - The output is manually set by the `manualValue` input.
      - `2`: **Off** - The controller is inactive, output is 0, and enable is false.
  - **`autoEnable`** (`boolean`): When in Auto mode, this input controls the controller's state. If `true` (default), the controller runs. If `false`, the controller pauses, resets, and sets its outputs to `0` and `false`.
  - **`PV`** (`number`): The current **P**rocess **V**alue (e.g., the sensor reading).
  - **`SV`** (`number`): The desired **S**etpoint **V**alue for the controller.
  - **`manualValue`** (`number`): The value to output when the controller is in **Manual** mode.

#### Outputs

The node has three outputs:

1.  **Full Status** (`object`): Sends a message object containing the controller's complete state (`{PV, SV, P, I, D, Output}`).
2.  **Digital Enable** (`boolean`): Sends `true` if the mode is Auto (and enabled) or Manual. Sends `false` if the mode is Off or if Auto mode is paused.
3.  **Analog Value** (`number`): Sends a simple message with the final output value as the `msg.payload`.

### Companion Nodes

  - `Setpoint (SV)`
  - `Process Value (PV)`
  - `Mode`
  - `Manual Value`
  - `Auto Enable`

Each companion node takes any `msg.payload` as input, sets the appropriate `msg.topic`, and passes the message on. They require no configuration.

-----

## Contributing

Contributions to improve the node or fix any issues are always welcome. Please submit a pull request on the GitHub repository.

## License

This project is licensed under the GPL-3.0 License. See the `LICENSE` file for details.

## Author

  - **Marc Alzen** ([@MarAlze](https://github.com/MarAlze))

### Original Author

This project is a fork of `node-red-contrib-easy-pid-controller`, originally created by **Harshad Joshi**.