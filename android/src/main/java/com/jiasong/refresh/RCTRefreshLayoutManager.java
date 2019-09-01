package com.jiasong.refresh;

import android.view.View;
import android.support.annotation.NonNull;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.scroll.ReactScrollView;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;
import com.scwang.smartrefresh.layout.listener.SimpleMultiPurposeListener;
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
        view.setHeight(headerHeight);
    }

    @ReactProp(name = "refreshing")
    public void setRefreshing(RCTRefreshLayout view, Boolean refreshing) {
        view.setRefreshing(refreshing);
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
