package com.jiasong.refresh;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class RCTRefreshLayoutManager extends ViewGroupManager<RCTRefreshLayout> {

    @Override
    public String getName() {
        return "RCTRefreshLayout";
    }

    @Override
    protected RCTRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        return new RCTRefreshLayout(reactContext);
    }

    @ReactProp(name = "headerHeight")
    public void setHeaderHeight(RCTRefreshLayout view, float headerHeight) {
        if (headerHeight != 0.0f) {
            view.setHeaderHeight(headerHeight);
        }
    }

    @ReactProp(name = "refreshing")
    public void setRefreshing(RCTRefreshLayout view, Boolean refreshing) {
        view.setRefreshing(refreshing);
    }

    @ReactProp(name = "enable")
    public void setEnable(RCTRefreshLayout view, Boolean enable) {
        view.setEnableRefresh(enable);

    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        String onChangeStateEvent = RCTRefreshLayout.onChangeStateEvent;
        String onChangeOffsetEvent = RCTRefreshLayout.onChangeOffsetEvent;
        return MapBuilder.<String, Object>builder()
                .put(onChangeStateEvent, MapBuilder.of("registrationName", onChangeStateEvent))
                .put(onChangeOffsetEvent, MapBuilder.of("registrationName", onChangeOffsetEvent)).build();
    }

}
