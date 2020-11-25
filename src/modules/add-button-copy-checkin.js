/**
 * Add button to copy checkin day to all month  to each calendar row like:
 * <tr class="day" data-day="13" data-week="20" data-weekday="MONDAY"/>
 * So then, from other modules, we can just do `row.dataset.day` or `$(row).data('weekday')`
 */
Extension.Modules.register({
  name: 'add-calendar-info',
  paths: [`/attendance/clock-in/`],
  requiresElement: '[class^="tableContainer__"],[class^="emptyList__"]'
}, new class {

  load($container) {
    $container.find('tbody > tr').not('.week-total-row').each((i, row) => {
      // console.log(row);
      $(row).addClass('copy-row');
      // console.log($(row).find('td:last'));
      $(row).find('td:nth-child(1)').append(`
          <button type="button" class="_2zVbK">
            <div class="_2U_uz_2-jO">
              <div class="_1_qCv_2-jO _2-R6J_2-jO _1lJbX_2-jO _3HiVn box___nBFPS padding_x_s8___1Pgn7 padding_y_s4___1nJEZ width_full___GXPW7 height_s32___1gzeu flex_direction_column___3_yBK background_primary1000___YyQFE">
                <div class="_32b_p_2-jO  box___nBFPS padding_x_s2___BwA3m flex_direction_row___1rGE2 align_items_center___MjjdX">
                  <div class="_32b_p_2-jO  box___nBFPS padding_x_s4___2sUGX flex_direction_column___3_yBK overflow_x_hidden___vhjK1">
                    <span class="text___2TOkD size_200___2HuYx weight_semibold___2R9kP color_grey000___2seTn">
                        <span class="_29A1e copy-checkin">Copy to month</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
      `);
    });
    $('.copy-checkin').on('click', (event) => this.copyCheckins($container, event));
  }

  copyCheckins($container, event) {
    const tr = $(event.currentTarget).parent().parent().parent().parent().parent().parent().parent().parent();
    const tbody = tr.parent();
    console.log(tbody);
    const inputs = tr.find('input').map(function(){
      return this.value;
    });
    const lines = inputs.length/2;
    console.log(inputs, lines);

    tbody.find('tr').each(function(){
      const trthis = this;
      for (let i=1;i < lines;i++) {
        $(trthis).find('._2zVbK')[1].click();
      }
      $(trthis).find('input').each(function(index){
        this.value = inputs[index] || null;
        const shift = $(this).parent().parent().parent().parent().parent().parent();
        if(index%2) {
          // const btn = shift.append(`
          //   <div class="_32b_p_2-jO  box___nBFPS padding_top_s12___3Xv_S flex_direction_column___3_yBK align_items_flexEnd___3nDzS">
          //       <button type="button" class="_2zVbK save-checkin">
          //           <div class="_2U_uz_2-jO">
          //               <div class="_1_qCv_2-jO _2-R6J_2-jO _1lJbX_2-jO _3HiVn box___nBFPS padding_x_s8___1Pgn7 padding_y_s4___1nJEZ width_full___GXPW7 height_s32___1gzeu flex_direction_column___3_yBK background_primary1000___YyQFE">
          //                   <div class="_32b_p_2-jO  box___nBFPS padding_x_s2___BwA3m flex_direction_row___1rGE2 align_items_center___MjjdX">
          //                       <div class="_32b_p_2-jO  box___nBFPS padding_x_s4___2sUGX flex_direction_column___3_yBK overflow_x_hidden___vhjK1">
          //                           <span class="text___2TOkD size_200___2HuYx weight_semibold___2R9kP color_grey000___2seTn">
          //                               <span class="_29A1e">Guardar</span>
          //                           </span>
          //                       </div>
          //                   </div>
          //               </div>
          //           </div>
          //       </button>
          //   </div>
          // `);
          // setTimeout(function(){
          //   btn.find('.save-checkin').click();
          // }, 1000);
          // console.log();
        }
        // console.log(shift);

       // $('.save-checkin').each(function(){
       //   this.click();
       // });
      })
    })
  }
}());