;(function () {

//把值存到 对像里面   在把对象push 数组    在把数组存到浏览器里面
    var $form_add_task=$('.add-task'),
        task_list=[];
    init(); //初始化

    $form_add_task.on("submit",function (ev) {
        ev.preventDefault();
        var new_task={};

        new_task.content=$(this).find("input").val();

        if(!new_task.content) return;
        add_task(new_task);
        if (task_list.length){
            renew_task_list();

        }
        $(this).find("input").val("");




    });
    //初始化
    function init() {
            task_list=store.get("gg") || [""];
        renew_task_list() //更新LI

    }

    function add_task(new_task) {
        task_list.push(new_task);
        store.set("gg",task_list);

    }
//更新数据
    function renew_task_list() {
    var $task_listul=$(".task-list");
        $task_listul.html(null); //清空ul
    for (var i=0;i<task_list.length;i++)
    {
    var $itme=task_list_tpl(task_list[i],i);

        $task_listul.append($itme);

    }
        delete_event() //点击删除事件
    }

    //li html

    function task_list_tpl(data,index){
        if (!data) return;
        //task_list[i].content
        var $str='<li class="task-item" data-index="index">'+
            '<input type="checkbox" class="complete">'+
            '<span class="task-content">'+data.content+'</span>'+
            '<div class="fr">'+
            '<span class="delete">删除</span>'+
            '<span class="detail">详细</span>'+
            '</div>'+
            '</li>';

        return $str;
    }

    //删除Li
        

                                            //删除功能
    function delete_task_list(index) {
        /*var off=confirm("你确定要删除吗？")
        if(!off) return;
        task_list.splice(index,1);
        renew_task_list(); //更新Li
*/
        $(".alertA").show();
        $(".primary").bind("click",function () {
            delete task_list[index];
            renew_delete_list();
            $(".alertA").hide();
            $(".primary").unbind("click")
        })
        $(".cancel").on("click",function () {
            $(".alertA").hide();
        })

    }

//点击删除事件

    function delete_event() {
        var $delete=$(".delete")
        $delete.on("click",function(){

            var index=$(this).parent().parent().data("index");
            console.log(index)
            delete_task_list(index); //删除功能
        })
    }


    //更新删除后的li
    function renew_delete_list() {
        store.set("gg",task_list);
        renew_task_list() //更新数据
    }


}());