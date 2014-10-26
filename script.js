$(function(){
	$('input[name=distancia], select').change(function(){
		$(this).parent().removeClass('has-error');
	});

	$('form').submit(function(){
		sensor = $(this).find('select');
		distancia = $(this).find('input[name=distancia]');
		is_valid = true;

		/* Validação básica do formulário */
		if(sensor.val() == ''){
			is_valid = false;
			sensor.parent().addClass('has-error');
		}

		if(distancia.val() == ''){
			is_valid = false;
			distancia.parent().addClass('has-error');
		} else {
			distancia = parseInt(distancia.val());
		}

		/* Calculando a brincadeira */
		if(is_valid){
			full_frame_width = 36;
			full_frame_height = 24;
			diagonal = Math.sqrt(Math.pow(full_frame_width, 2)+Math.pow(full_frame_height, 2));

			switch(sensor.val()){
				case 'canon': 
						diagonal = diagonal / 1.6;
					break;
				case 'nikon': 
						diagonal = diagonal / 1.5;
					break;
			}

			
			angle = (Math.atan((diagonal/2) / distancia) * 180 / Math.PI) * 2;
			human_angle = degToDms(angle);

			$('h3.angle').html(human_angle.deg+"° "+human_angle.min+"' "+human_angle.sec+'"');
			generateViewPreview(angle);
		}

		return false;
	});
});

function generateViewPreview(angulo){
	$('.view-angle').html('<div class="angle-demo"></div>');
	preview_width = $('.view-angle').width() / 2;
	normaliza = angulo / 90;
	preview_height = preview_width * normaliza;
	
	$('.angle-demo').css('border-width', (preview_height/2)+"px "+preview_width+"px "+(preview_height/2)+"px 0");
}

function degToDms(dd){
	deg = dd | 0;
    frac = Math.abs(dd - deg);
    min = (frac * 60) | 0;
    sec = frac * 3600 - min * 60;

    return {deg: deg, min: min, sec: Math.ceil(sec)};
}