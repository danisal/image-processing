import type { Context, Service, ServiceSchema } from "moleculer";
import { Errors } from "moleculer";
import axios from "axios";
import sharp from "sharp";

export interface ActionImageParams {
	url?: string;
	width?: string;
	height?: string;
	base64?: string;
}

interface GetterSettings {}

interface GetterMethods {
	uppercase(str: string): string;
}

interface GetterLocalVars {
	myVar: string;
}

type GreeterThis = Service<GetterSettings> & GetterMethods & GetterLocalVars;

const GreeterService: ServiceSchema<GetterSettings> = {
	name: "getter",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		image: {
			rest: "GET /image",
			params: {
				base64: {
					type: "string",
					optional: true,
					default: false,
					custom: (value: string, errors: unknown[]) => {
						if (typeof value === "boolean") {
							return value;
						}

						if (value === "false") {
							return false;
						}

						if (value === "true") {
							return true;
						}

						return errors.push({
							field: "base64",
							message: 'base64 needs to be either "false" or "true"',
							actual: value,
						});
					},
				},
				height: {
					default: 200,
					optional: true,
					type: "string",
					custom: (value: string, errors: unknown[]) => {
						const height = parseInt(value, 10);
						const isNaN = Number.isNaN(height);

						if (isNaN) {
							errors.push({
								field: "height",
								message: "Height should be a number",
								actual: value,
							});
						}

						if (height < 1) {
							errors.push({
								field: "height",
								message: "Height should be a positive integer",
								actual: value,
							});
						}

						return value;
					},
				},
				url: {
					type: "string",
					optional: true,
					default:
						"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
				},
				width: {
					default: 400,
					optional: true,
					type: "string",
					custom: (value: string, errors: unknown[]) => {
						const width = parseInt(value, 10);
						const isNaN = Number.isNaN(width);

						if (isNaN) {
							errors.push({
								field: "width",
								message: "Width should be a number",
								actual: value,
							});
						}

						if (width < 1) {
							errors.push({
								field: "width",
								message: "Width should be a positive integer",
								actual: value,
							});
						}

						return value;
					},
				},
			},
			async handler(ctx: Context<ActionImageParams>) {
				const { height: stringHeight, width: stringWidth, base64, url } = ctx.params;

				if (!stringHeight || !stringWidth) {
					throw new Errors.MoleculerError("Missing height or width");
				}

				if (!url) {
					throw new Errors.MoleculerError("Missing image URL");
				}

				const height = parseInt(stringHeight, 10);
				const width = parseInt(stringWidth, 10);

				const response = await axios.get(url, { responseType: "arraybuffer" });
				const image = await sharp(response.data).resize(width, height).toBuffer();

				if (base64) {
					return { image: image.toString("base64") };
				}

				return { image };
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created(this: GreeterThis) {},

	/**
	 * Service started lifecycle event handler
	 */
	async started(this: GreeterThis) {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped(this: GreeterThis) {},
};

export default GreeterService;
