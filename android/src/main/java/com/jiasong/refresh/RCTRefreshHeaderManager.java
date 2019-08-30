package com.jiasong.refresh;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RCTRefreshHeaderManager extends ViewGroupManager<ReactSmartRefreshLayout> {


    @Override
    public String getName() {
        return "RCTRefreshHeader";
    }

    @Override
    protected ReactSmartRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        RCTRefreshHeader header = new RCTRefreshHeader(reactContext);
        ReactSmartRefreshLayout  smartRefreshLayout = new ReactSmartRefreshLayout(reactContext);
        smartRefreshLayout.setEnableLoadMore(false);
        smartRefreshLayout.setEnableRefresh(true);
        smartRefreshLayout.setHeaderMaxDragRate(2);//最大显示下拉高度/Header标准高度
        smartRefreshLayout.setHeaderTriggerRate(1);//触发刷新距离 与 HeaderHeight 的比率1.0.4
        smartRefreshLayout.setDragRate((float) 0.5);
        smartRefreshLayout.setEnableOverScrollDrag(true);
        smartRefreshLayout.setEnableOverScrollBounce(true);
        smartRefreshLayout.setEnablePureScrollMode(false);
        smartRefreshLayout.setRefreshHeader(header);
//        smartRefreshLayout.setRefreshContent(header);
//        smartRefreshLayout.setRefreshContent(new View(reactContext));
//        smartRefreshLayout.setHeaderHeight(100);
        return smartRefreshLayout;
    }

    @Override
    public void addView(ReactSmartRefreshLayout parent, View child, int index) {
        if(index == 1) {
            parent.setRefreshContent(child);
        } else {
            super.addView(parent,child,index);
        }
    }


}
