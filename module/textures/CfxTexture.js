/**
 * @author citizenfx
 */

import { Texture } from './Texture.js';
import { NearestFilter, RGBFormat } from '../constants.js';

function CfxTexture( ) {

	var data = new Uint8Array( 3 );
	var width = 1;
	var height = 1;

	var format = RGBFormat;

	Texture.call( this, null, undefined, undefined, undefined, undefined, undefined, format, undefined, undefined, undefined );

	this.image = { data: data, width: width, height: height };

	this.magFilter = NearestFilter;
	this.minFilter = NearestFilter;

	this.generateMipmaps = false;
	this.flipY = false;
	this.unpackAlignment = 1;

}

CfxTexture.prototype = Object.create( Texture.prototype );
CfxTexture.prototype.constructor = CfxTexture;

CfxTexture.prototype.isDataTexture = true;
CfxTexture.prototype.isCfxTexture = true;


export { CfxTexture };
